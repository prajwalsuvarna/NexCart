import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    
        console.log(`MongoDB Connected: ${con.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.error(`Error: ${error.message}`.bgRed.white);
        
    }
}

export default connectDB;