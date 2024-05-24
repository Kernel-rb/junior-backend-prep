import express from 'express';

import { getUsers ,  delete_User, getUserById } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json({ users }).end();
    } catch (error) {
        console.log(`Error while getting all users: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await delete_User(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(`Error while deleting user: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ message: "Bad request" });
        }
        const user = await getUserById(id);
        user.username = username;
        await user.save();
        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.log(`Error while updating user: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
}
