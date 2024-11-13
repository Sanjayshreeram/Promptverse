import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request)  
{


    
        const {Prompt,username} = await req.json();
        console.log(Prompt,username);



       const user=await prisma.user?.findUnique({

        where:{
          username:username
        }
       })
       
       console.log(user);
       const getprompts=await prisma.prompt.findFirst({

        where:{
          userId:user?.id
        },
        select:{
          prompt:true
        }
       })
       console.log(getprompts);
        const updatedprompts=getprompts?.prompt ? [...getprompts.prompt, Prompt] : [Prompt];
       const updated=await prisma.prompt.update({

           where:{
            id: user?.id // Assuming 'id' is the unique identifier for the Prompt model
            
           },
           data:{
          
             prompt:updatedprompts,
            userId: user?.id // Ensure this is the correct userId
           }
          })

          return new Response(JSON.stringify({
            message: "Updated the prompt"
            
          }))
    

     

      
    
}
