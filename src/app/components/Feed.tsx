import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Feed = () => {
    const {data:session}=useSession();
    const [UserPrompts, SetUserPrompts] = useState<string[]>([]);



    useEffect(() => {
        const fetchprompts = async () => {
            const username = session?.user?.name;
            console.log({ username });
    
            if (username) {
                try {
                    const response = await axios.post("/api/FetchUserPrompts", {
                        username
                    });
                    const data = response.data;
                    console.log()
                    SetUserPrompts(data.data?.prompts[0].prompt || []);
                   
                } catch (error) {
                    console.error("Error fetching prompts:", error);
                }
            }
        };
        fetchprompts();
    }, [session]);
    

    return (
        <div className="w-full p-4"> {/* Add padding for spacing */}
            My Feed components
            {UserPrompts.map((e, index) => (
                <p className="text-black" key={index}>
                    {e}
                </p>
            ))}
        </div>
    );
}

export default Feed