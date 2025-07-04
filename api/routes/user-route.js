import express from "express";

const user_router = express.Router()

user_router.get("/user",(req,res)=>{

    try{
        res.status(200).send({message:"usuarios listados"})
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:error,status:500})
    }

})

export default user_router
