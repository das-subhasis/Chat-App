import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import mongoose from "mongoose";
import axios from "axios";
import client from "../config/client";
import { useNavigate } from "react-router-dom";

export interface User {
    _id?: mongoose.Types.ObjectId | null;
    username?: string | null;
    email?: string | null;
    password?: string | null;
    pic?: string | null;
    token?: string | null;
}

interface AuthContextType {
    user: User;
    login: (username: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string, pic?: string) => Promise<void>;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    selectedChats: any;
    setSelectedChats: React.Dispatch<React.SetStateAction<any>>;
    chats: any;
    setChats: React.Dispatch<React.SetStateAction<any>>;
}

const initialUserState: User = JSON.parse(localStorage.getItem("userInfo")!) || {
    _id: null,
    username: null,
    email: null,
    password: null,
    pic: null,
    token: null
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(initialUserState);
    const [selectedChats, setSelectedChats] = useState<any>(null);
    const [chats, setChats] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("userInfo", JSON.stringify(user));
    }, [user]);

    const login = async (username: string, password: string) => {
        try {
            const { data } = await client.post(
                "/user/login",
                { username, password },
                { headers: { "Content-Type": "application/json" } }
            );
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate('/chats');
        } catch (error: any) {
            console.log(error);
        }
    };

    const signup = async (username: string, email: string, password: string, pic?: string) => {
        try {
            const { data } = await client.post(
                "/user/signup",
                { username, email, password, pic },
                { headers: { "Content-Type": "application/json" } }
            );
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate('/chats')
        } catch (error: any) {
            console.log(error);
        }
    };

    const logout = () => {
        try {
            setUser({
                _id: null,
                username: null,
                email: null,
                password: null,
                pic: null,
                token: null
            });
            localStorage.clear();
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, setUser, selectedChats, setSelectedChats, chats, setChats }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}
