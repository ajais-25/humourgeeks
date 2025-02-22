import mongoose from "mongoose";
import { Setup } from "../models/setup.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createSetup = async (req, res) => {
    const { setup, tags } = req.body;

    if (!setup || !tags) {
        return res.status(400).json({
            message: "Setup and tags are required",
        });
    }

    const createdSetup = await Setup.create({
        setup,
        tags,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, createdSetup, "Setup created successfully"));
};

const getSetups = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const { tags, status, search } = req.query;

    const filter = {};

    if (tags) {
        const tagsArray = tags.split(",");
        filter.tags = {
            $all: tagsArray.map((tag) => new mongoose.Types.ObjectId(tag)),
        };
    }

    if (status) {
        filter.status = status;
    }

    if (search) {
        filter.setup = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const user = await User.findOne({ clerkId: req.auth?.userId });

    const setups = await Setup.aggregate([
        {
            $addFields: {
                status: {
                    $cond: {
                        if: { $in: ["$_id", user?.solved] },
                        then: "solved",
                        else: "unsolved",
                    },
                },
            },
        },
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "tags",
                localField: "tags",
                foreignField: "_id",
                as: "tags",
            },
        },
        { $skip: skip },
        { $limit: limit },
    ]);

    const count = await Setup.aggregate([
        {
            $addFields: {
                status: {
                    $cond: {
                        if: { $in: ["$_id", user?.solved] },
                        then: "solved",
                        else: "unsolved",
                    },
                },
            },
        },
        {
            $match: filter,
        },
        {
            $count: "total",
        },
    ]);

    const total = count[0]?.total || 0;

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { setups, total },
                "Setups retrieved successfully"
            )
        );
};

const getSetup = async (req, res) => {
    const { id } = req.params;

    const setup = await Setup.findById(id).populate("tags");

    return res
        .status(200)
        .json(new ApiResponse(200, setup, "Setup retrieved successfully"));
};

export { createSetup, getSetups, getSetup };
