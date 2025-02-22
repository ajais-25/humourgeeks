import { User } from "../models/user.model.js";
import { Punchline } from "../models/punchline.model.js";
import { Setup } from "../models/setup.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getAIResponse } from "../utils/gemini.js";

// TODO: PUNCH ADD KARNE SE PHELE MODEL KO CALL KARKE RESULT LANA HAI
const addPunch = async (req, res) => {
    const { setupId } = req.params;
    const { punchline } = req.body;

    if (!punchline) {
        return res.status(400).json({ message: "Punchline is required" });
    }

    punchline.trim();

    const setup = await Setup.findById(setupId);

    if (!setup) {
        return res.status(404).json({ message: "Setup not found" });
    }

    // Call the model here
    const aiResponse = await getAIResponse(setup.setup, punchline);

    const response = JSON.parse(aiResponse);

    const sarcasm = response.Sarcasm;
    const wholesome = response.Wholesome;
    const dark = response.Dark_Humor;
    const pun = response.Pun;
    const overallRating = response.Overall_Humor_Percentage;

    const humorRating = {
        sarcasm,
        wholesome,
        dark,
        pun,
        overallRating,
    };

    // console.log(req.auth.userId);
    const userId = await User.findOne({ clerkId: req.auth?.userId });

    const user = await User.findById(userId);

    const isSolved = await Punchline.findOne({
        setupId,
        user: userId,
    });

    if (isSolved) {
        isSolved.punches.push({ punchline, humorRating });
        await isSolved.save({ validateBeforeSave: false });

        user.history.pull(isSolved._id);
        user.history.push(isSolved._id);
        await user.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(new ApiResponse(200, isSolved, "Punchline added"));
    }

    const punch = await Punchline.create({
        setupId,
        user: userId,
        punches: [{ punchline, humorRating }],
    });

    user.history.push(punch._id);
    user.solved.push(setupId);
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, punch, "Punchline added"));
};

const getPunchlines = async (req, res) => {
    const { setupId } = req.params;

    const userId = await User.findOne({ clerkId: req.auth?.userId });

    const punchlines = await Punchline.findOne({ setupId, user: userId });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                punchlines?.punches || [],
                "Punchlines fetched"
            )
        );
};

export { addPunch, getPunchlines };
