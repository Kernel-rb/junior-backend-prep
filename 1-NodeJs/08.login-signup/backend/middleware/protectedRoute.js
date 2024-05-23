import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


export const protectedRoute =  async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ message: "Unauthorized" });
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode) return res.status(401).json({ message: "Unauthorized , Invalid token " });
        const user = await User.findById(decode.userId).select("-password -secret_token");
        if (!user) return res.status(404).json({ message: "User not found" });
        req.user = user;
        next();
    } catch (error) {
        console.log(`Error in protectedRoute: ${error.message}`);
        res.status(500).json({ message: "Something Went Wrog" });
    }
}


