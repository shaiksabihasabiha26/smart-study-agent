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
Generate 5 multiple-choice quiz questions from these study notes.

Rules:
- Each question should have 4 options (A, B, C, D).
- Mention the correct answer after each question.

Study Notes:
${notes}
      `,
    });

    return NextResponse.json({
      quiz: response.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { quiz: "Failed to generate quiz." },
      { status: 500 }
    );
  }
}