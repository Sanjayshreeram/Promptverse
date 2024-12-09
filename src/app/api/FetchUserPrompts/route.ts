import React from "react";

import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const Prisma=new PrismaClient();
export async function POST(req: Request) {
    console.log('called the userdataprofile')
    const session = await getServerSession();
    console.log('the server session is',session);
    const {username}=await req.json();


    const user = await Prisma.user.findFirst({
        where: { username },
        select: { id: true }, // Only fetch the user ID
      });

    const prompts = await Prisma.prompt.findMany({
        where: {
            userId: user?.id
        },
       
          
                skip:0,
                take:7,
                orderBy:{
                    id:"desc"
                }

            
        
    });

    console.log(prompts);

    return new Response(JSON.stringify({
        data: prompts
    }));
}


