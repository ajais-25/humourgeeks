import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getUserHistory = async (req, res) => {
    const userId = await User.findOne({ clerkId: req.auth?.userId });

    const history = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: "punchlines",
                localField: "history",
                foreignField: "_id",
                as: "history",
                pipeline: [
                    {
                        $lookup: {
                            from: "setups",
                            localField: "setupId",
                            foreignField: "_id",
                            as: "setup",
                            pipeline: [
                                {
                                    $project: {
                                        _id: 1,
                                        setup: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: "$setup",
                    },
                    {
                        $project: {
                            _id: 1,
                            setup: 1,
                            createdAt: 1,
                        },
                    },
                ],
            },
        },
        {
            $project: {
                _id: 0,
                history: 1,
            },
        },
        {
            $unwind: "$history",
        },
        {
            $sort: {
                "history.createdAt": -1,
            },
        },
    ]).limit(5);

    return res
        .status(200)
        .json(
            new ApiResponse(200, history, "User history fetched successfully")
        );
};

export { getUserHistory };
