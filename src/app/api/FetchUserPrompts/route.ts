import React from "react";

import { PrismaClient } from "@prisma/client";

const Prisma=new PrismaClient();
export async function POST(req: Request) {
    const { username } = await req.json();

    const prompts = await Prisma.user.findFirst({
        where: {
            username
        },
        select: {
            prompts: true
        }
    });

    console.log(prompts);

    return new Response(JSON.stringify({
        data: prompts
    }));
}