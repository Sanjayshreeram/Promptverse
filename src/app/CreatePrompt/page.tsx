"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import Feed from "../components/Feed";

const Page =() => {
  const { data: session } = useSession();
  const [userinput, setuserinput] = useState<string>("");

  const handlesubmit = async () => {
    console.log("User input:", userinput);
    if (!userinput) {
      console.error("Prompt is empty");
      return;
    }

    try {
      const response = await axios.post("/api/Addprompt", {
        Prompt: userinput, // Pass the user input to the API
        username: session?.user?.name,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting prompt:", error);
    }
  };

  return session?.user ? (
    <div className="grid w-1/2 gap-2">
    <Textarea placeholder="Type your message here." onChange={(e)=>setuserinput(e.target.value)}  />
    <Button onClick={handlesubmit}>
    Create Prompt
    </Button>

    <Feed/>
    </div>
  ) : (
    <div>NOT SIGNED IN USER</div>
  );
};

export default Page;
