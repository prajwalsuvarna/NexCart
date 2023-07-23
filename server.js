import express from "express";
import "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

//configuring dotenv
dotenv.config();

//connecting to database
connectDB();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json()); // Enable JSON parsing in req and response
app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://nex-ecom.vercel.app");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

//routes

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

// listening to port
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.bgCyan.white);
});

//api's
app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});
