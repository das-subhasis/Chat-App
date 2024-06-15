import React, { useState, MouseEvent } from 'react';
import Box from "@mui/material/Box";
import { AppBar, Button, Menu, MenuItem, TextField, Tooltip } from '@mui/material';
import { FaAngleDown, FaBell, FaDropbox, FaSearch } from "react-icons/fa";
import profile_pic from "../assets/profile_pic.jpg";
import { useAuthContext } from '../context/AuthContext';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { user, logout } = useAuthContext();

    const handleLogout = () => {
        logout();
        handleClose();
    };

    return (
        <div className='flex items-center bg-[#FFFF] shadow-sm '>
            <div className='container px-10 mx-auto w-full h-16 flex items-center justify-between'>
                <div className='flex items-center justify-center gap-3 bg-slate-100 p-2 rounded-md focus-within:bg-slate-200'>
                    <FaSearch className='mt-1' />
                    <input type="text" placeholder='Search user' className='h-8 outline-none bg-inherit' />
                </div>
                <div className='mr-20'>
                    <h1>Let's Talk</h1>
                </div>
                <div className='flex items-center w-fit justify-center gap-7'>
                    <div className='flex items-center justify-center w-fit'>
                        <button><FaBell size={20} /></button>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='w-10 h-10 rounded-full overflow-hidden '>
                            <img src={profile_pic} alt="profile pic" className='w-full h-full' />
                        </div>
                        <span className='flex items-center justify-center w-fit'>
                            <button
                                id='resources-button'
                                onClick={handleClick}
                                aria-controls={open ? 'resources-menu' : undefined}
                                aria-haspopup='true'
                                aria-expanded={open ? 'true' : undefined}
                            ><FaAngleDown size={20} /></button>
                            <Menu
                                id='resources-menu'
                                anchorEl={anchorEl}
                                open={open}
                                MenuListProps={{
                                    "aria-labelledby": "resources-button"
                                }}
                                onClose={handleClose}
                                className='mt-6'
                            >
                                {
                                    user ? (
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    ) : (
                                        <>
                                            <MenuItem>Login</MenuItem>
                                            <MenuItem>Signup</MenuItem>
                                        </>
                                    )
                                }
                            </Menu>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
