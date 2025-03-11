import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/conn.js";  // Make sure to add .js extension
import router from "./routes/router.js";  // Make sure to add .js extension
import users from "./models/userSchema.js";

dotenv.config();

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
