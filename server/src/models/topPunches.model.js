import mongoose, { Schema } from "mongoose";

const topPunchesSchema = new Schema(
    {
        setupId: {
            type: Schema.Types.ObjectId,
            ref: "Setup",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        punchline: {
            type: String,
            required: true,
        },
        upvotes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        humourRating: {
            sarcasm: {
                type: Number,
                required: true,
            },
            wholesome: {
                type: Number,
                required: true,
            },
            dark: {
                type: Number,
                required: true,
            },
            pun: {
                type: Number,
                required: true,
            },
            overallRating: {
                type: Number,
                required: true,
            },
        },
    },
    { timestamps: true }
);

export const TopPunches = mongoose.model("TopPunches", topPunchesSchema);
