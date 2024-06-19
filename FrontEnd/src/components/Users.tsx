import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import client from '../config/client';
import profile_pic from "../assets/profile_pic.jpg"
import { useAuthContext } from '../context/AuthContext';
import SideBar from '../components/SideBar';
import { formatDate, getReceiver } from '../utils/util';

const Users = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const { user, chats, setChats, selectedChats, setSelectedChats } = useAuthContext();

    const fetchChats = async () => {
        const { data } = await client.get('/chat/', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        setChats(data);
    }

    console.log(selectedChats);


    useEffect(() => {
        fetchChats();
    }, [])
    return (
        <div className='flex flex-col bg-white w-[35%] rounded-lg px-10 py-5 container mx-auto gap-5'>
            <SideBar open={open} toggleDrawer={toggleDrawer} setOpen={setOpen} />

            <div className='mt-4 flex justify-between items-center'>
                <h1 className='text-2xl font-medium'>Chats</h1>
                <button
                    className='bg-black text-white px-4 py-2 rounded-md font-medium flex items-center gap-2'
                    onClick={toggleDrawer(true)}
                >
                    <FaSearch size={15} color='#FFFF' />
                    <span>Search Users</span>
                </button>
            </div>
            <div className='flex-1 py-2 flex flex-col gap-5'>
                {
                    chats && chats.map((chat , index: number) => {
                        return (
                            <div
                                className='h-14 flex items-center bg-slate-300 py-2 px-2 gap-2 rounded-xl cursor-pointer'
                                onClick={() => setSelectedChats(chat)}
                                key={index}>
                                <div
                                    className='w-10 h-10 overflow-hidden rounded-full'>
                                    <img src={profile_pic} alt="" className='w-full h-full' />
                                </div>
                                <div className='flex-1 flex flex-col h-full justify-center '>
                                    <span className='text-sm'>
                                        {
                                            getReceiver(user._id!, chat.users)
                                        }
                                    </span>
                                    <span className='text-xs'>
                                        last talked: {formatDate(chat.updatedAt)}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



export default Users