import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
        type: "object",
        properties: {
            Match_with_setup: {
                type: "string",
                enum: ["Low", "Medium", "High"],
            },
            Pun: {
                type: "integer",
            },
            Dark_Humor: {
                type: "integer",
            },
            Sarcasm: {
                type: "integer",
            },
            Wholesome: {
                type: "integer",
            },
            Overall_Humor_Percentage: {
                type: "integer",
            },
            Sentiment: {
                type: "string",
                enum: ["Neutral", "Positive", "Controversial"],
            },
        },
        required: [
            "Match_with_setup",
            "Pun",
            "Dark_Humor",
            "Sarcasm",
            "Wholesome",
            "Overall_Humor_Percentage",
            "Sentiment",
        ],
    },
};

const parts = [
    {
        input: `"Setup": "I was worried AI would take my job, so I asked ChatGPT, “Are you coming for me?” It responded…"\n"Punchline": "As an AI language model, I have no personal desires… but if I did, you’d already be gone.”`,
        output: `{\n  "Match_with_setup": "High",\n  "Pun": 6,\n  "Dark_Humor": 7,\n  "Sarcasm": 8,\n  "Wholesome": 2,\n  "Overall_Humor_Percentage": 75,\n  "Sentiment": "Neutral"\n}'`,
    },
    {
        input: `"Setup" : "I asked AI to generate a joke, and it said, “You.”"\n"Punchline": "So now I’m stuck in an existential crisis—am I funny or just a bug in the system?"`,
        output: `{\n  "Match_with_setup": "High",\n  "Pun": 4,\n  "Dark_Humor": 5,\n  "Sarcasm": 6,\n  "Wholesome": 3,\n  "Overall_Humor_Percentage": 60,\n  "Sentiment": "Neutral"\n}'`,
    },
    {
        input: `"Setup" : "I trained an AI on every joke ever written. It came up with something so funny, so perfect, so legendary…"\n"Punchline" : "…that my brain blue-screened trying to process it. I’ll let you know when I reboot."`,
        output: `{\n  "Match_with_setup": "Low",\n  "Pun": 9,\n  "Dark_Humor": 3,\n  "Sarcasm": 5,\n  "Wholesome": 1,\n  "Overall_Humor_Percentage": 50,\n  "Sentiment": "Neutral"\n}'`,
    },
    {
        input: `"Setup" : "My smart fridge started using AI to predict when I’ll run out of food. Now, it also predicts when I’ll give up on my diet."\n"Punchline" : "Yesterday, it sent me a notification: “Don’t even pretend you’re eating that salad.”"`,
        output: `{\n  "Match_with_setup": "Low",\n  "Pun": 4,\n  "Dark_Humor": 3,\n  "Sarcasm": 7,\n  "Wholesome": 2,\n  "Overall_Humor_Percentage": 50,\n  "Sentiment": "Neutral"\n}'`,
    },
];

// Function to train the model with pre-loaded data
async function trainModel() {
    for (const part of parts) {
        await model.tr;
        await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: part.input }],
                },
            ],
            generationConfig,
        });
    }
}

// Route for humor analysis
export async function getAIResponse(setup, punchline) {
    // Train the model with pre-loaded data
    await trainModel();

    // Format prompt for AI model
    // const setup = `I was worried AI would take my job, so I asked ChatGPT, “Are you coming for me?”`;
    // const punchline = `As an AI language model, I have no personal desires… but if I did, you’d already be gone.`;

    const prompt = `
        Analyze the following joke and return a JSON response with these exact fields:
        {
            "Pun": (integer from 0 to 85),
            "Dark": (integer from 0 to 85),
            "Sarcasm": (integer from 0 to 85),
            "Wholesome": (integer from 0 to 85),
            "Wordplay": (integer from 0 to 85),
            "Overall_Rating": (integer from 0 to 85)
        }

        ### Important Rules:
        ⿡ If the punchline is unclear, incomplete, or ambiguous, return this exact JSON:
        {"Error": "Invalid punchline. Please provide a complete joke."}
        ⿢ Do NOT attempt to generate or assume a missing punchline.
        ⿣ The response must ONLY be valid JSON with no extra text.

        *Joke:*
        Setup: ${setup}
        Punchline: ${punchline}

        Return only the JSON object.
    `;

    // Generate response
    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
    });

    // console.log(result.response.text());
    return result.response.text();
}
