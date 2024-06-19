// ChatPage.tsx
import { Drawer } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import client from '../config/client';
import profile_pic from "../assets/profile_pic.jpg"
import { User, useAuthContext } from '../context/AuthContext';
import Skeleton from '../components/Skeleton';
import SideBar from '../components/SideBar';
import mongoose from 'mongoose';
import Users from '../components/Users';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {

  const {selectedChats} = useAuthContext();
  
  return (
    <div className='flex-1 flex flex-col items-center justify-between px-10 py-5 gap-5 '>
      <div className='flex-1 flex gap-2 w-full '>
        <Users/>
        <div className='bg-white w-[65%] rounded-lg p-5'>
          {
            selectedChats && (
              <ChatBox userId={selectedChats._id}/>
            ) 
          }
        </div>
      </div>

    </div>
  )
}


export default ChatPage
