"use client"
import axios from 'axios';
import Feed from '../components/Feed';
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react';
 const Page = () => {
  


  return (
    <div className='flex flex-col'>
      <div>
      Hello {'name'}
      <p className='text-bold text-2xl'>
        User promopt Prompt
      </p>

      </div>
      <div>
      <Feed/>

      </div>
    
      

     
    
    </div>
  )
}
export default Page;
