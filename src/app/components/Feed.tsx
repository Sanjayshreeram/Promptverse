import { useSession } from 'next-auth/react';
import React, { useEffect, useState, memo } from 'react';
import axios from 'axios';
import Ripple from '@/components/ui/ripple';

const fetchtopten=async ()=>
{
  const getdata=await fetch('api/RecentPrompts');
  console.log(getdata);


}

const PromptCard = memo(({ text, name }: { text: string; name: string }) => (
  <div className="bg-slate-50 text-black rounded-md w-40 h-40 p-2 flex flex-col justify-start border-black border-md shadow-lg relative">
    <p className="text-sm text-blue-400 absolute top-2 left-2">
      {name}
    </p>
    <div className="mt-6 text-center">
      <p className="text-black  font-bold">{text}</p>
    </div>
  </div>
));


const Feed = () => {
  const { data: session } = useSession();
  fetchtopten();


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
          <PromptCard key={index} text={e} name={session?.user?.name || 'Unknown'} />
        ))}
      </div>
    </div>
  );
};

export default memo(Feed); // Wrap the entire Feed component with memo
