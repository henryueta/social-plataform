import express from "express"
import cors from "cors"
import user_router from "./routes/user-route.js";
import cookieParser from "cookie-parser";

import auth_router from "./routes/auth-route.js";

const server = express();

server.use(cors({
    credentials:true, 
    origin:"https://class-plataform.vercel.app"
}))
server.use(express.json())
server.use(cookieParser())
server.use(user_router)
server.use(auth_router)

server.get("/",(req,res)=>{

    try{

        res.status(200).send({message:"Welcome to my Server!"})

    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }

})


server.listen(3530,(error)=>{
    if(error){
        console.log(error)
        throw new Error(error)
    }
    console.log("server-online")
})
