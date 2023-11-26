

import { Router } from "express";
import { Cart, CartManager } from "../managers/cartManager.js";
const carts =  new CartManager('files/carts.json')

const cartsRouter = Router();



cartsRouter.get("/",(req,res)=>{
    res.json({
        carts:carts
    })
})


cartsRouter.get("/:cid",async (req,res)=>{
    try {
        console.log(req.params);
        const {cid} = req.params
        console.log(cid)
        const cart = await (carts.getCartById(parseInt(cid)))
        res.json({cart:cart})

    } catch (error) {
        console.log(`hubo un error: ${error}`);
    }
 
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

