import express from "express";

const router = express.Router();

// Routes
router.get("/", (req, res) => {
    const locals = {
        title: "Home",
        description: "Welcome to the homepage",
    };
    res.render("index");
});


router.get("/about", (req, res) => {
    res.render("about");
});


export default router;
