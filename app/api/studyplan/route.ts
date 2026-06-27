import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { notes } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an expert study coach.

Create a personalized 5-day study plan based on these notes.

Rules:
- Divide the study into Day 1 to Day 5.
- Each day should have 3-5 short tasks.
- Include revision and self-testing.
- Keep the language simple and motivating.

Study Notes:
${notes}
      `,
    });

    return NextResponse.json({
      studyPlan: response.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        studyPlan: "Failed to generate study plan.",
      },
      { status: 500 }
    );
  }
}