import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { Prompt, username } = await req.json();
    console.log("Received Prompt:", Prompt, "for Username:", username);

    if (!Prompt || !username) {
      console.error("Prompt or Username is missing.");
      return new Response(
        JSON.stringify({ message: "Prompt or Username is required." }),
        { status: 400 }
      );
    }

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.error("User not found for username:", username);
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Check if a prompt entry exists for the user
    const existingPrompt = await prisma.prompt.findFirst({
      where: { userId: user.id },
    });

    if (existingPrompt) {
      // Ensure 'prompt' is an array before updating
      if (!Array.isArray(existingPrompt.prompt)) {
        console.error("Prompt data is not an array:", existingPrompt.prompt);
        return new Response(
          JSON.stringify({ message: "Invalid prompt data format." }),
          { status: 500 }
        );
      }
      // Update existing prompt
      const updatedPrompts = [...existingPrompt.prompt, Prompt];
      await prisma.prompt.update({
        where: { id: existingPrompt.id },
        data: { prompt: updatedPrompts },
      });
    } else {
      // Create a new prompt entry
      await prisma.prompt.create({
        data: {
          prompt: [Prompt], // Create as an array
          userId: user.id,
        },
      });
    }

    return new Response(
      JSON.stringify({ message: "Prompt updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during prompt update:", error);
    return new Response(
      JSON.stringify({ message: "An internal error occurred." }),
      { status: 500 }
    );
  }
}
