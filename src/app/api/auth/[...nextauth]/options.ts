import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();

export const Options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your username",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "enter your password",
        },
      },
      async authorize(credentials) {

        let user = await prisma?.user?.findUnique({
          where: {
            username: credentials?.username
          }
        });

        if(!user)
        {
          user=await prisma.user.create({

            data:{
              username:credentials?.username || '',
              password:credentials?.password || ''
            }
          })
        }


          return {
            
             id: user.id.toString(), // Convert id to string
             name:user?.username,
             userid:user?.id,
             password:user?.password
             
          };
        
      },
    }),
  ],
};
