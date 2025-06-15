import dotenv from "dotenv";
import express from 'express';
import path from "path";
import notesRoutes from "./Routes/notesRoute.js";
import { connectDB } from './config/db.js';
import rateLimiter from "./middleware/rateLimiter.js";

import cors from "cors";

dotenv.config();



const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()


 
if(process.env.NODE_ENV !== "production") {
    app.use(cors({
    origin: 'http://localhost:5173'
    }));
}

//middleware
app.use(express.json()); // this middleware will pars JSON bodies: req.body
app.use(rateLimiter);


//our simple middleware here that we created for testing
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} and req URL is ${req.url}`);
//     next();
// });


//Routes prefix we can say that 
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
    
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
});
}

connectDB().then(() =>{   // this line for connecting to database first then start server
    app.listen(PORT, ()=> {
        console.log('Server is running on port:',PORT);
    });
});