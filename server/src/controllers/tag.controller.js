import { Tag } from "../models/tag.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTag = async (req, res) => {
    const { name, description } = req.body;

    console.log("Name: ", name);

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const tag = await Tag.create({ name, description });

    return res.status(201).json(new ApiResponse(201, tag, "Tag created"));
};

const getTags = async (req, res) => {
    const tags = await Tag.find();

    return res.status(200).json(new ApiResponse(200, tags, "Tags fetched"));
};

const deleteTag = async (req, res) => {
    const { id } = req.params;

    const tag = await Tag.findById(id);

    if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
    }

    await Tag.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200, null, "Tag deleted"));
};

export { createTag, getTags, deleteTag };
