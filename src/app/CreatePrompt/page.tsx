"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Feed from "../components/Feed";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const { data: session } = useSession();
  const [userinput, setuserinput] = useState<string>("");


  const handlesubmit = useCallback(async () => {
    if (!userinput) {
      toast.error("Prompt is empty");
      console.error("Prompt is empty");
      return;
    }
    try {
      const response = await axios.post("/api/Addprompt", {
        Prompt: userinput,
        username: session?.user?.name,
      });
      toast.success("Prompt Created");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting prompt:", error);
      toast.error("Error submitting prompt");
    }
    console.log("User input:", userinput);
  }, [userinput, session?.user?.name]); // Dependency array

  return session?.user ? (
    <div className="grid w-1/2  h-screen gap-2">
      <Textarea
        placeholder="Type your message here."
        onChange={(e) => setuserinput(e.target.value)}
      />
      <Button onClick={handlesubmit} className="w-1/2 justify-center items-center">Create Prompt</Button>
      <ToastContainer className="size-2" />
      <Feed />
    </div>
  ) : (
    <div>NOT SIGNED IN USER</div>
  );
};

export default Page;
