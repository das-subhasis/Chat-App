import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import mongoose from "mongoose";
import axios from "axios";
import client from "../config/client";

export interface User {
    id?: mongoose.Types.ObjectId | null;
    username?: string | null;
    email?: string | null;
    password?: string | null;
    pic?: string | null;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string, pic?: string) => Promise<void>;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const initialUserState: User = {
    id: null,
    username: null,
    email: null,
    password: null,
    pic: null,
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const { data } = await client.post(
                "/user/login",
                {
                    username,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error: any) {
            console.log(error);
        }
    };

    const signup = async (username: string, email: string, password: string, pic?: string) => {
        try {
            const { data } = await client.post(
                "/user/register",
                {
                    username,
                    email,
                    password,
                    pic,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error: any) {
            console.log(error);
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem("userInfo");
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, setUser }}>
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

