import OpenAI from "openai";
import { verifyUser } from "@/services/authentication";
import { apiSuccess, apiError } from "@/services/errorResponses";

const client = new OpenAI({
//
});

export async function POST(req) {
    try {
        let authUser;
        try {
            authUser = verifyUser(req);
        } catch (error) {
            return apiError(
                error.message,
                401
            );
        }
        console.log("cat chat api");
        const { searchParams } = new URL(req.url);
        const userID = searchParams.get("userid");
        console.log(userID);
        if (!userID) {
            return apiError(
                "Missing parameter: ID",
                400
            );
        }
        const body = await req.json();
        if (!body) {
            return apiError(
                "Missing parameter: JSON",
                400
            );
        }
        const personality = ``;
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: personality
                },
                { role: "user", content: body.message }
            ]
        });
        const chatResponse = response.choices[0].message.content;
        return apiSuccess(
            "Successfully generated AI cat reply",
            chatResponse,
            200
        );

    } catch (error) {
        return apiError(
            "Failed to process POST request " + error.message,
            500
        );
    }
}