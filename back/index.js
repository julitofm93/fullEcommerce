import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };

app.listen(PORT, () => {
    connect();
    console.log(`Listening on ${PORT}`)
});


app.use(cors({credentials:true, origin:["http://localhost:3000","http://localhost:3001"]}))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);

