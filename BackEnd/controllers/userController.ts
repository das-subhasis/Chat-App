import expressAsyncHandler from "express-async-handler"
import User from "../models/User";
import { generateToken } from "../utils/authUtils";
import bcrypt from "bcrypt"
import { Request, Response } from "express";

export const fetchUsers = expressAsyncHandler(async (req, res) => {
    try{
        const query = req.query.search ? {
            $or: [
                { username: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        } : {};
        const users = await User.find(query).select("-password");
        res.status(200).json(users);
    } catch (error : any){
        console.log(error);
        res.status(500);
        throw new Error('Failed to fetch users.');
    }
})

export const authUser = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    try {
        const foundUser = await User.findOne({ username });

        if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
            res.status(404);
            throw new Error("Invalid username or password");
        }

        res.status(200).json({
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            pic: foundUser.pic,
            token: generateToken(foundUser._id)
        })

    } catch (error: any) {
        res.status(401);
        throw new Error(error);
    }
})

export const registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password, pic } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });

        if (existingUser) {
            res.status(409);
            throw new Error("User already exists.");
        };


        const newUser = await User.create({
            username: username,
            email: email,
            password: password,
            pic: pic.trim() === "" ? null : pic
        });

        res.status(200).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            pic: newUser.pic,
            token: generateToken(newUser._id)
        });

    } catch (error: any) {
        throw new Error(error);
    }
})

export const removeUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const id = req.params.userId;
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).send(`User - ${id} has been removed successfully.`)
    } catch (error) {
        res.status(400);
        throw new Error("Failed to remove user");
    }
})
