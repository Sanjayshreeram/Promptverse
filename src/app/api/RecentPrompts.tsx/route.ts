import React from "react";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
const prisma=new PrismaClient();
export async function GET(req:Request)
{

console.log('called me man')

    const recentprompts=await prisma?.prompt.findMany({

        take:10,
        orderBy:{
            id:"desc"
        }
    })
    console.log(recentprompts);
    return new Response(JSON.stringify(
        recentprompts
    ))

}