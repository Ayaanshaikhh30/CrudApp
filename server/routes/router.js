import express from "express";
import users from "../models/userSchema.js";
const router = express.Router();




// Register User

router.post("/register", async (req, res) => {
    console.log("🔥 API Hit Ho Gayi!");
    console.log(req.body);

    const { name, email, age, mobile, work, add, desc } = req.body;

    // 🛑 Stop execution after sending a response
    if (!name || !email || !age || !mobile || !work || !add || !desc) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    try {
        const preuser = await users.findOne({ email: email });
        console.log(preuser);

        if (preuser) {
            return res.status(409).json({ error: "This user is already present" });
        } else {
            const adduser = new users({ name, email, age, mobile, work, add, desc });
            await adduser.save();

            console.log(adduser);
            return res.status(201).json(adduser);
        }

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Server error" });
    }
});


// Get Userdata

router.get("/getdata", async (req, res) => {  
    try {
        const userdata = await users.find();
        res.status(200).json(userdata);  // 

        console.log(userdata);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Server error" });
    }
});


// Get individual user

router.get("/getuser/:id", async (req, res) => {
    try {
        console.log("Received ID:", req.params.id); // Debugging

        const { id } = req.params;

        // Find user by ID
        const userindividual = await users.findById(id);

        // If user not found
        if (!userindividual) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User Data:", userindividual); // Log full user data
        
        res.status(200).json(userindividual); // Send full user data as response
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Update User
router.put("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age, mobile, add, work, desc } = req.body;

        console.log("Received Update Request for ID:", id);
        console.log("Request Body:", req.body);

        const updatedUser = await users.findByIdAndUpdate(
            id, 
            { name, email, age, mobile, add , work, desc }, 
            { new: true }  // ✅ "new: true" ensures we get updated data
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Updated User:", updatedUser);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Delete User 

router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Received Delete Request for ID:", id);

        const deleteuser = await users.findByIdAndDelete(id); // ✅ Correct Syntax

        if (!deleteuser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Deleted User:", deleteuser);
        res.status(200).json({ message: "User deleted successfully", deletedUser: deleteuser });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});









export default router;

