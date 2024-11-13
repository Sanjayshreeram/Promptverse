"use client";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter(); // Initialize the router object

  const { data: session } = useSession();

  // console.log({ session });

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

  return (
    <div>
      {!session ? (
        <>
          <p>You are not signed in.</p>

          <button onClick={() => signIn()}>Sign in</button>
        </>
      ) : (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => router.push("/CreatePrompt")}>
            Create prompt
          </button>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
