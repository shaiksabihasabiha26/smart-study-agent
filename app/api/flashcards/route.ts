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
Generate 10 study flashcards from these notes.

Format:

Flashcard 1
Question:
Answer:

Flashcard 2
Question:
Answer:

Study Notes:
${notes}
      `,
    });

    return NextResponse.json({
      flashcards: response.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        flashcards: "Failed to generate flashcards.",
      },
      { status: 500 }
    );
  }
}