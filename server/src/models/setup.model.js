import mongoose, { Schema } from "mongoose";

const setupSchema = new Schema(
    {
        setup: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],
    },
    { timestamps: true }
);

export const Setup = mongoose.model("Setup", setupSchema);
