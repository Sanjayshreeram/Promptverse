import { useSession } from 'next-auth/react';
import React, { useEffect, useState, memo } from 'react';
import axios from 'axios';

const PromptCard = memo(({ text }: { text: string }) => (
  <div className="bg-slate-50 text-black rounded-md w-24 h-20 justify-center content-center flex items-center border-black border-md shadow-lg">
    <p className="text-black">{text}</p>
  </div>
));

const Feed = () => {
  const { data: session } = useSession();
  const [UserPrompts, SetUserPrompts] = useState<string[]>([]);

  useEffect(() => {
    const fetchprompts = async () => {
      const username = session?.user?.name;
      console.log({ username });

      if (username) {
        try {
          const response = await axios.post("/api/FetchUserPrompts", {
            username,
          });
          const data = await response.data;
          console.log("data promtp is ",data?.data[0].prompt);

          SetUserPrompts(data?.data[0].prompt || []);
        } catch (error) {
          console.error("Error fetching prompts:", error);
        }
      }
    };
    fetchprompts();
  }, [session]);

  return (
    <div className="w-full p-4 flex h-full gap-4 m-10 flex-col">
      <p className="font-bold text-2xl">User Thought and Ideas...</p>
      <div className="flex flex-wrap gap-4">
        {UserPrompts.map((e, index) => (
          <PromptCard key={index} text={e} />
        ))}
      </div>
    </div>
  );
};

export default memo(Feed); // Wrap the entire Feed component with memo
