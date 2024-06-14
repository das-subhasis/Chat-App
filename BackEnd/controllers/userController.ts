import expressAsyncHandler from "express-async-handler"
import User from "../models/User";
import { generateToken } from "../utils/authUtils";
import bcrypt from "bcrypt"

const authUser = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
        const foundUser = await User.findOne({ username });

        if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
            res.status(404);
            throw new Error("Invalid username or password");
        }

        console.log()

        res.status(200).json({
            user: {
                _id: foundUser._id,
                username: foundUser.username,
                email: foundUser.email,
                pic: foundUser.pic,
                token: generateToken(foundUser._id)
            }
        })
    } catch (error: any) {
        res.status(401);
        throw new Error(error);
    }
})

const registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password, pic } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });

        // throw error if a user exists
        if (existingUser) {
            res.status(409);
            throw new Error("User already exists.");
        };


        const newUser = await User.create({
            username: username,
            email: email,
            password: password,
            pic: pic
        });

        res.status(200).json({
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                pic: newUser.pic,
                token: generateToken(newUser._id)
            }
        });

    } catch (error: any) {
        throw new Error(error);
    }
})

export { authUser, registerUser }