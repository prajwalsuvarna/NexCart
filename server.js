import  express from "express"
import "colors"
import dotenv from "dotenv"

//configuring dotenv
dotenv.config()
const PORT=process.env.PORT || 8080;


const app=express();

// listening to port
app.listen(PORT,()=>{ 
    console.log(`server is running on port ${PORT}`.bgCyan.white);
})

//api's
app.get('/',(req,res)=>{
    res.send('<h1>hello world</h1>');
})
