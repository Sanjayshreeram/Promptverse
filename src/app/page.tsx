"use client";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { stat } from "fs";
import {Button} from "@/components/ui/button"
import Feed from "@/app/components/Feed"


export default function Home() {
  const router = useRouter(); // Initialize the router object

  const { data: session,status } = useSession();
   


   if(status=="loading")
    return <div>.....loading user</div>

  // const createUser = async () => {
  //   try {
  //     console.log("Sending request to create user...");
  //     // Ensure session is valid before making the request
  //     if (session?.user?.name && session?.user?.email) {
  //       const response = await axios.post("/api/Createuser", {
  //         username: session.user.name,
  //         email: session.user.email,
  //       });
  //       console.log("User created:", response.data);
  //     } else {
  //       console.log("Session user data is incomplete.");
  //     }
  //   } catch (error) {
  //     console.error("Failed to create user:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (session) {
  //     createUser(); // Call createUser only when session is available
  //   }
  // }, [session]);
  
  console.log({ session });

  return (
    <div className="flex flex-col items-center justify-center  w-full h-screen dark:bg-black">
      {!session ? (
        <>
          <p>You are not signed in.</p>

          <button onClick={() => signIn()}>Sign in</button>
        </>
      ) : (
        <>
      <div className="flex flex-col items-center justify-center gap-2 w-full h-screen">
    <p className="font-medium text-xl">Welcome, {session.user?.name}</p>

    <Button>
      Profile page
    </Button>

    <p className="font-bold text-1xl">
        Start sharing your ideas with the world!
    </p>
    
    <p className="font-bold text-2xl ml-4">
        Create and share what matters.
    </p>

    <Button onClick={() => router.push("/CreatePrompt")}>Create Prompt</Button>

    {/* Adjust Feed component styling */}
    <div className="w-full h-screen flex justify-center mt-4">
        <Feed />
    </div>
</div>

    
    
         
        </>
      )}
    </div>
  );
}
