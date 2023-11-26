

import { Router } from "express";
import { Cart, CartManager } from "../managers/cartManager.js";
const carts =  new CartManager('files/carts.json')

const cartsRouter = Router();


cartsRouter.get("/",async (req,res)=>{
    try {
        console.log(req.query); // ?key=valor&key2=valor
        const c = await carts.getCarts()
        console.log(c);
        const { limit } = req.query
        if(!limit){
            return res.json({carts:c})
        }else{
            {return res.json(c.slice(0,limit))}
        }
    } catch (error) {
        console.log(`hubo un error: ${error}`);
    }
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


cartsRouter.post("/", async (req,res)=>{
    try {
        const {cart} = req.body;
        const response = await carts.addCart(cart);
        return res.json({
            status:"Carrito Creado",
            carts:response
        })
    } catch (error) {
        
    }
    
})


// TODO: Agregar producto a un carrito
cartsRouter.post('/:cid/product/:pid',async (req,res) => {
    try{ 
     const { cid, pid } = req.params;
 //    console.log(cid,pid);
     const cart = await (carts.updateCart(parseInt(cid),parseInt(pid)))
     res.json(cart);
  }catch(error){ throw new Error (error)
    }
    })


    cartsRouter.delete("/:cid",async (req,res)=>{
        try {
            console.log(req.params);
            const {cid} = req.params
            console.log(cid)
            const cart = await (carts.deleteCart(parseInt(cid)))
            return res.json({cart:cart})
    
        } catch (error) {
            console.log(`hubo un error: ${error}`);
        }
     
    })


export default cartsRouter

