

import { Router } from "express";

const cartsRouter = Router();

const carts = []

cartsRouter.get("/",(req,res)=>{
    res.json({
        carts:carts
    })
})

cartsRouter.post("/",(req,res)=>{
    const {id,username,name} = req.body 
    users.push({
        id: parseInt(id),
        username,
        name
    })
    res.json({
        status:"Usuario Creado",
        usuarios:users
    })
})



export default cartsRouter

