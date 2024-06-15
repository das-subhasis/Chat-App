import React from 'react'
import { FaAngleDown, FaBell } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import profile_pic from "../assets/profile_pic.jpg"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
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
        <div className='h-16 bg-[#151515] px-16 text-white '>
            <div className='w-full h-full container mx-auto flex items-center justify-between'>
                <div className='flex items-center justify-center w-fit'>
                    <Link to={'/'}><h1 className='text-xl font-medium'>Let's Talk</h1></Link>
                </div>
                <div className='flex items-center gap-8'>
                    <div>
                        <FaBell size={20} color='#FFF' />
                    </div>
                    <div className='flex items-center gap-2'>
                        <div
                            className='w-8 h-8 rounded-full overflow-hidden'
                        >
                            <button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <img src={profile_pic} alt="profile picture" className='w-full h-full' />
                            </button>
                        </div>
                        <div className='flex items-center'>
                            <button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <FaAngleDown size={20} color='#FFF' />
                            </button>
                        </div>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            className='mt-4'
                        >
                            {
                                 user ? (
                                    [
                                        <MenuItem key="profile" onClick={handleClose}>Profile</MenuItem>,
                                        <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
                                    ]
                                ) : (
                                    [
                                        <MenuItem key="login" onClick={handleClose}><Link to={'/login'}>Login</Link></MenuItem>,
                                        <MenuItem key="signup" onClick={handleClose}><Link to={'/signup'}>Signup</Link></MenuItem>
                                    ]
                                )
                            }
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
