import mongoose, { Schema } from "mongoose";

const humorRatingSchema = new Schema({
    sarcasm: {
        type: Number,
        default: 0,
        required: true,
    },
    wholesome: {
        type: Number,
        default: 0,
        required: true,
    },
    dark: {
        type: Number,
        default: 0,
        required: true,
    },
    pun: {
        type: Number,
        default: 0,
        required: true,
    },
    overallRating: {
        type: Number,
        default: 0,
        required: true,
    },
});

const punchesSchema = new Schema(
    {
        punchline: {
            type: String,
            required: true,
        },
        humorRating: {
            type: humorRatingSchema,
            required: true,
        },
    },
    { timestamps: true }
);

const punchlineSchema = new Schema(
    {
        setupId: {
            type: Schema.Types.ObjectId,
            ref: "Setup",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        punches: [
            {
                type: punchesSchema,
                required: true,
            },
        ],
    },
    { timestamps: true }
);

export const Punchline = mongoose.model("Punchline", punchlineSchema);
