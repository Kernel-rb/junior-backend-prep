import express from "express";
import { register, login  , me} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js"; 


const router = express.Router();

// auth routes
router.get("/me", protectedRoute, me);
router.post("/register", register);
router.post("/login", login);


export default router;