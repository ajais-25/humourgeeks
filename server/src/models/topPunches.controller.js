import { User } from "../models/user.model.js";
import { Setup } from "../models/setup.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { TopPunches } from "../models/topPunches.model.js";
import mongoose from "mongoose";

const postPunch = async (req, res) => {
    const { setupId } = req.params;
    const { punchline } = req.body;
    const humourRating = req.body.humourRating;

    if (!punchline || !humourRating) {
        return res
            .status(400)
            .json({ message: "Punchline and Humour Rating is required" });
    }

    punchline.trim();

    const setup = await Setup.findById(setupId);

    if (!setup) {
        return res.status(404).json({ message: "Setup not found" });
    }

    const dark = humourRating[0].rating;
    const pun = humourRating[1].rating;
    const sarcasm = humourRating[2].rating;
    const wholesome = humourRating[3].rating;
    let count = 0;
    if (dark > 0) count++;
    if (pun > 0) count++;
    if (sarcasm > 0) count++;
    if (wholesome > 0) count++;
    if (count === 0) count = 1;

    const overallRating = Math.ceil((dark + wholesome + sarcasm + pun) / count);

    const rating = {
        dark,
        wholesome,
        sarcasm,
        pun,
        overallRating,
    };

    const userId = await User.findOne({ clerkId: req.auth?.userId });

    const punch = await TopPunches.create({
        setupId,
        userId,
        punchline,
        humourRating: rating,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, punch, "Top Punchline added"));
};

const getTopPunches = async (req, res) => {
    const { setupId } = req.params;

    const userId = await User.findOne({ clerkId: req.auth?.userId });

    try {
        const topPunches = await TopPunches.aggregate([
            {
                $match: { setupId: new mongoose.Types.ObjectId(setupId) },
            },
            {
                $addFields: {
                    upvoteCount: { $size: "$upvotes" },
                    isUpvoted: {
                        $cond: {
                            if: {
                                $in: [
                                    new mongoose.Types.ObjectId(userId),
                                    "$upvotes",
                                ],
                            },
                            then: true,
                            else: false,
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user",
            },
            {
                $project: {
                    _id: 1,
                    punchline: 1,
                    upvoteCount: 1,
                    isUpvoted: 1,
                    user: {
                        name: 1,
                    },
                    humourRating: 1,
                    createdAt: 1,
                },
            },
            {
                $sort: {
                    upvoteCount: -1,
                    createdAt: -1,
                },
            },
        ]);

        return res
            .status(200)
            .json(new ApiResponse(200, topPunches, "Top Punchlines retrieved"));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const toggleUpvote = async (req, res) => {
    const { punchId } = req.params;
    const userId = await User.findOne({ clerkId: req.auth?.userId });

    const punchline = await TopPunches.findById(punchId);

    if (!punchline) {
        return res.status(404).json({ message: "Punchline not found" });
    }

    if (punchline.upvotes.includes(userId._id)) {
        punchline.upvotes.pull(userId._id);
    } else {
        punchline.upvotes.push(userId._id);
    }

    await punchline.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, punchline, "Upvote toggled"));
};

export { postPunch, getTopPunches, toggleUpvote };
