import dotenv from "dotenv";
import express from "express";
import expressLayout from "express-ejs-layouts";
import mainRoutes from "./server/routes/mainRoutes.js";
import adminRoutes from "./server/routes/adminRoutes.js";

dotenv.config();

// app : 
const app = express();
const PORT = process.env.PORT || 5000;

// Static Files
app.use(express.static("public"));

// EJS
app.use(expressLayout);
app.set("layout" , "./layouts/main");
app.set("view engine", "ejs"); 



// Routes
app.use("/", mainRoutes);
app.use("/admin", adminRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});