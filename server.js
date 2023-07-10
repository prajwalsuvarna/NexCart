import  express from "express"
import "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import cors from "cors"
const corsOptions ={
	origin: 'http://127.0.0.1:5173',
	credentials: true,
  };


//configuring dotenv
dotenv.config()

//connecting to database
connectDB()

const PORT=process.env.PORT || 8080;

const app=express();

//middleware
app.use(cors(corsOptions))
app.use(express.json())//enable json parsing in req and response
app.use(morgan('dev'))



//routes

app.use('/api/auth',authRoutes)

// listening to port
app.listen(PORT,()=>{ 
    console.log(`server is running on port ${PORT}`.bgCyan.white);
})

//api's
app.get('/',(req,res)=>{
    res.send('<h1>hello world</h1>');
})
