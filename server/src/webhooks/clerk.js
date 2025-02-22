import { Webhook } from "svix";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

export const userWebhook = async (req, res) => {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;

    if (!SIGNING_SECRET) {
        return res.status(400).json({
            message:
                "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env",
        });
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers and body
    const headers = req.headers;
    const payload = req.body.toString();

    // Get Svix headers for verification
    const svix_id = headers["svix-id"];
    const svix_timestamp = headers["svix-timestamp"];
    const svix_signature = headers["svix-signature"];

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).json({
            message: "Error: Missing svix headers",
        });
    }

    let evt;

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If verification fails, error out and return error code

    try {
        evt = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.log("Error: Could not verify webhook:", err.message);
        return res.status(400).json({
            message: err.message,
        });
    }

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
        console.log("userId:", evt.data.id);
        const firstName = evt.data.first_name;
        const lastName = evt.data.last_name;
        const name = `${firstName} ${lastName}`;
        const email = evt.data.email_addresses[0].email_address;

        const user = User.create({
            clerkId: id,
            name,
            email,
        });

        if (!user) {
            return res.status(400).json({
                message: "Error: Could not create user",
            });
        }

        return res.status(200).json(new ApiResponse(200, user, "User created"));
    } else if (eventType === "user.deleted") {
        // check karna hai ek baar
        const clerkId = evt.data.id;

        console.log("Deleting user with clerkId:", clerkId);

        const user = await User.findOneAndDelete({ clerkId });

        if (!user) {
            return res.status(400).json({
                message: "Error: Could not delete user",
            });
        }

        return res.status(200).json(new ApiResponse(200, "User deleted"));
    }

    return res.status(200).json(new ApiResponse(200, "Webhook received"));
};
