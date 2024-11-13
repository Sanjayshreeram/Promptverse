import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, email } = req.body;

    const user = await prisma.user.create({
      data: {
        username: username,
        password: email, // Storing email as password for demo purposes
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
}
