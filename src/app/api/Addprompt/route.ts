import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { Prompt, username } = await req.json();
    console.log(Prompt, username);

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    const getprompts = await prisma.prompt.findMany({
      where: {
        userId: user.id,
      },
      select: {
        prompt: true,
      },
    });

    // Flatten prompt strings if it's nested
    const existingPrompts = getprompts.map((p) => p.prompt).flat();
    const updatedprompts = [...existingPrompts, Prompt].flat();

    // Ensure `prompt` is a simple array of strings
    const updated = await prisma.prompt.update({
      where: {
        id: user.id, // Ensure this is the correct field in your schema
      },
      data: {
        prompt: updatedprompts,
        userId: user.id,
      },
    });

    return new Response(JSON.stringify({ message: "Updated the prompt" }));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "An error occurred" }), { status: 500 });
  }
}
