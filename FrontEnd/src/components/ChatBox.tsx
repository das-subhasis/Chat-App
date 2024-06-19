import React, { ChangeEvent, useEffect, useState } from 'react';
import { BiSolidSend } from 'react-icons/bi';
import client from '../config/client';
import profile_pic from '../assets/profile_pic.jpg';
import { useAuthContext } from '../context/AuthContext';
import { getReceiver } from './Users';
import useSocket from '../context/SocketRef';

interface Message {
    _id: string;
    sender: {
        _id: string;
        username: string;
        email: string;
        pic: string;
    };
    content: string;
    chat: {
        _id: string;
        users: string[];
        createdAt: string;
        updatedAt: string;
        latestMessage: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface ChatBoxProps {
    userId: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ userId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState<string>('');
    const { user, selectedChats } = useAuthContext();
    const socketRef = useSocket('http://localhost:5000');

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const fetchMessages = async (userId: string) => {
        try {
            const { data } = await client.get<Message[]>(`/message/${userId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        if (content.trim() !== '') {
            try {
                const messageData = {
                    content: content,
                    chat: selectedChats._id,
                    sender: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        pic: user.pic,
                    },
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };

                const { data } = await client.post<Message>('/message/send', messageData, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                setMessages((prevMessages) => [...prevMessages, data]);
                socketRef.current?.emit('send_message', data);
                setContent('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    useEffect(() => {
        if (userId) {
            fetchMessages(userId);
        }

        socketRef.current?.emit('join_chat', selectedChats._id);

        socketRef.current?.on('receive_message', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socketRef.current?.off('receive_message');
        };
    }, [userId, selectedChats._id, socketRef]);

    return (
        <div className='w-full h-[80vh] rounded-xl bg-[#151515] flex flex-col pb-5 overflow-hidden'>
            <div className='h-16 w-full px-5 py-3 flex items-center gap-5 overflow-hidden'>
                <div className='w-10 h-10 overflow-hidden rounded-full'>
                    <img src={profile_pic} alt="profile" className='w-full h-full' />
                </div>
                <div className='h-full'>
                    <h1 className='text-white text-lg'>{getReceiver(user._id, selectedChats.users)}</h1>
                </div>
            </div>
            <div className='h-[80%] overflow-y-scroll flex flex-col gap-3 px-3 py-5'>
                {messages.map((message) => (
                    <div
                        className={`flex items-center gap-2 ${message.sender._id !== user._id ? 'ml-0' : 'ml-auto'} w-fit`}
                        key={message._id}
                    >
                        {message.sender._id !== user._id && (
                            <div className='w-7 h-7 overflow-hidden rounded-full'>
                                <img src={profile_pic} alt="profile" className='w-full h-full' />
                            </div>
                        )}
                        <div
                            className={`w-fit px-5 py-1 rounded-full ${message.sender._id === user._id ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                        >
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-full px-7 flex items-center gap-5 mt-5'>
                <input
                    type="text"
                    placeholder='Message'
                    className='w-full h-full bg-[#1c1c1c] px-3 rounded-lg outline-none focus:ring-2 focus:ring-white placeholder:text-gray-300 text-white'
                    value={content}
                    onChange={changeHandler}
                />
                <button
                    className='bg-white p-2 rounded-full flex items-center justify-center'
                    onClick={sendMessage}
                >
                    <BiSolidSend size={20} color='#000' />
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
