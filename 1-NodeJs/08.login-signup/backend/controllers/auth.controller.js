import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenanSetCookie } from "../lib/utils/generateTokenanSetCookie.js";

export  const register = async (req, res) => {
    const { name, username, email, password, phoneNumber, secret_token } = req.body;
    try {
        /*
        --- All fields validation ---
        @name: name must be provided
        @username: username must be provided
        @email: email must be provided
        @password: password must be provided
        @phoneNumber: phoneNumber must be provided
        @secret_token: secret_token must be provided
        */
        if(!name || !username || !email || !password || !phoneNumber || !secret_token) return res.status(400).json({ message: "All fields are required" });
        /*
       --- Name validation ---
       @nameRegex: only letters and spaces
       @nameExist: check if name already exist
       @length: name must be between 3 and 20 characters
       */
      const nameRegex = /^[a-zA-Z\s]+$/;
      const nameExist = await User.findOne({ name });
      if (nameExist) return res.status(400).json({ message: "Name already exist" });
      if (!nameRegex.test(name)) return res.status(400).json({ message: "Name can only contain letters" });
      if (name.length < 3) return res.status(400).json({ message: "Name must be at least 3 characters" });
      if (name.length > 20) return res.status(400).json({ message: "Name must not exceed 20 characters" });
      /*
      --- Username validation ---
       @forbiddenUsername: list of forbidden usernames
       @usernameExist: check if username already exist
       @length: username must be between 3 and 20 characters
      */
        const forbiddenUsername = ["admin", "moderator", "superuser", "root", "administrator", "sysadmin", "support", "helpdesk", "system", "null", "undefined", "test", "guest", "user", "owner", "Kernel.rs"];
        if (forbiddenUsername.includes(name.toLowerCase())) return res.status(400).json({ message: "Username is forbidden" });
        const usernameExist = await User.findOne({ username });
        if (usernameExist) return res.status(400).json({ message: "Username already exist" });
        if (username.length < 3) return res.status(400).json({ message: "Username must be at least 3 characters" });
        if (username.length > 20) return res.status(400).json({ message: "Username must not exceed 20 characters" });
      
        /*
        --- Email validation ---
        @emailRegex: email 
        @emailExist: check if email already exist
        @length: email must be between 3 and 20 characters
        */
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) return res.status(400).json({ message: "Invalid email" });
        const emailExist = await User.findOne({ email });
        if (emailExist) return res.status(400).json({ message: "Email already exist" });
        if (email.length < 3) return res.status(400).json({ message: "Email must be at least 3 characters" });
        if (email.length > 20) return res.status(400).json({ message: "Email must not exceed 20 characters" });

        /*
        --- Password validation ---
        @length: password must be at least 6 characters 
        @salt :  generate salt to hash password
        @hashedPassword: hash password
        */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
        
        /*
        --- Phone Number validation ---
        @phoneNumberRegex: phone number
        @phoneNumberExist: check if phone number already exist  
        */
        const phoneNumberRegex = /^\d{10}$/;
        if (!phoneNumberRegex.test(phoneNumber)) return res.status(400).json({ message: "Invalid phone number" });
        const phoneNumberExist = await User.findOne({ phoneNumber });
        if (phoneNumberExist) return res.status(400).json({ message: "Phone number already exist" });

        /*
        --- Secret Token validation ---
        @salt : generate salt to hash secret token
        @hashedSecretToken: hash secret token
        */
        const saltToken = await bcrypt.genSalt(10);
        const hashedSecretToken = await bcrypt.hash(secret_token, saltToken);

        /*
        if Ok => create new user
        */
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
            phoneNumber,
            secret_token: hashedSecretToken,
        });
        if(newUser) {
            await newUser.save();
            generateTokenanSetCookie(newUser._id, res);
            return res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                message: "User created"
             });
        } else {
            return res.status(400).json({ message: "User not created" });
        }
        
    } catch (error) {
        console.log(`Error in register: ${error.message}`);
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const login = async (req, res) => {
    const { username, password, secret_token } = req.body;
    try {
        /*
        1 - All fields validation
        @username: username must be provided
        @password: password must be provided
        @secret_token: secret_token must be provided
        2 - is user exist && password match && secret token match
        3 - generate token and set cookie
        4 - return user data
        */
        if (!username || !password || !secret_token) return res.status(400).json({ message: "All fields are required" });
        const user = await User.findOne({ username });
        const passwordMatch = await bcrypt.compare(password, user?.password || "");
        const secretTokenMatch = await bcrypt.compare(secret_token, user?.secret_token || "");
        if (!user || !passwordMatch || !secretTokenMatch) return res.status(400).json({ message: "Invalid credentials" });
        generateTokenanSetCookie(user._id, res);
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            message: "User logged in"
        });
    } catch (error) {
        console.log(`Error in login: ${error.message}`);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export const me = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -secret_token");
        if (!user) return res.status(400).json({ message: "User not found" });
        return res.status(200).json(user);
    } catch (error) {
        console.log(`Error in me: ${error.message}`);
        res.status(500).json({ message: "Something went wrong" });
    }
}