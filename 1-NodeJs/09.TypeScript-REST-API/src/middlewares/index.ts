import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';

export const isOwner = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, "identity._id") as string;
        if (!currentUserId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (currentUserId.toString() !== id) {
            return res.status(403).json({ message: "Forbidden" });
        }
        return next();
    } catch (error) {
        console.log(`Error while checking ownership: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const isAuthenticated = async (req: express.Request, res: express.Response , next:express.NextFunction) => {
    try {
        const sessionToken = req.cookies["SECRET"];
        if(!sessionToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        merge(req, { user: existingUser });
        return next();
    } catch (error) {
        console.log(`Error while authenticating: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};