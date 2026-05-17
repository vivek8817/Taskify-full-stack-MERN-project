import {Request, Response} from 'express';
import {UserModel} from '../models/UserModel';
import generateToken from '../utils/generateToken';




export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // Simple validation check
        if (!name || !email || !password) {
            res.status(400).json({ error: "Sare fields (name, email, password) zaroori hain!" });
            return;
        }

        // agar pehle se hai toh
        const userExists = await UserModel.findOne({email});
        if(userExists){
            res.status(400).json({ error: "Ye email pehle se registered hai!" });
            return;   
        }

        // Naya user create karein (Bina hashing ke, abhi simple rakh rahe hain)
        const newUser = new UserModel({ name, email, password });
        await newUser.save();

        res.status(201).json({
            message: "User successfully register ho gaya!",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token: generateToken(newUser._id.toString())//token add hogaya
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}


export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            res.status(400).json({ error: "Email aur password dono zaroori hain!" });
            return;
        }

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(401).json({ error: "Invalid email ya password!" });
            return;
        }

        // Match Hashed Password (Custom method call)
        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            res.status(401).json({ error: "Invalid email ya password!" });
            return;
        }

        // Success response with user details
        res.status(200).json({
            message: "Login successfully ho gaya!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id.toString())//token add hogaya

            }
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};