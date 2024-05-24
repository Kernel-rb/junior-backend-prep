import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import {authentification, random} from '../helpers'


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;
        if(!email || !password || !username) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const existingUser = await getUserByEmail(email);
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentification: {
                salt,
                password: authentification(salt, password)
            }
        });
        return res.status(201).json({ user }).end();
    } catch (error) {
        console.log(`Error while registering: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const user = await getUserByEmail(email).select("+authentification.salt +authentification.password");
        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const excryptedPassword = authentification(user.authentification.salt, password);
        if(excryptedPassword !== user.authentification.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const salt = random();
        user.authentification.sessionToken = authentification(salt, user._id.toString());
        await user.save();
        res.cookie("SECRET", user.authentification.sessionToken, {
          domain: "localhost",
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        return res.status(200).json({ user }).end();
    } catch (error) {
        console.log(`Error while logging in: ${error}`)
        return res.status(500).json({ message: "Internal server error" });
    }
};