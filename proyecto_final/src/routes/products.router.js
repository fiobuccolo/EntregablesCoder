import { Router } from "express";

import {Product, ProductManager } from "../managers/productManager.js";
const products =  new ProductManager('files/products.json')

const productsRouter = Router(); 


productsRouter.get("/", async (req,res)=>{ 
    try {
         console.log(req.params); // :
        console.log(req.query); // ?key=valor&key2=valor
         const prods = await products.getProducts()
        //console.log(prods)
         const { limit } = req.query
         console.log(`limit: ${limit}`);
         if(!limit){
             res.json({products:prods})
         }else{
             {res.json(prods.slice(0,limit))}
         }
     } catch (error) {
             console.log(`hubo un error: ${error}`);
     }   
 })
 
 // params
 productsRouter.get("/:pid",async (req,res)=>{
     try {
         console.log(req.params);
         const {pid} = req.params
         console.log(pid)
         const prod = await (products.getProductById(parseInt(pid)))
         res.json({product:prod})
 
     } catch (error) {
         console.log(`hubo un error: ${error}`);
     }
  
 })


 //POST
    // TODO: 1. Validaciones de tipo de dato - Esto se hace con typeOf, o en la class se define el tipo de dato permitido? 
        
 productsRouter.post("/",async (req,res)=>{
        try{ 
            const {title,description,price,thumbnail,code,stock,status,category} = req.body
            console.log("validacion de inputs")
            if(!title || !description || !price || !category || !stock || !code) {
                return res.json({message:  "missing data" })
             }
            console.log("creación de product de inputs")
            const newProduct = new Product(title,description,price,thumbnail,code,stock,status,category)
            console.log(newProduct)
            const response = await products.addProduct(newProduct);
            console.log("hola")
            return res.json({
                message: response
            })
        }  catch(error){ throw new Error (error)}
 }) 

 //UPDATE
    // TODO: 1. validaciones de que no repitan un codigo de otro producto
        //   2 Validaciones de tipo de dato
        //   3. Validar que en el body no me mande un id distinto del param. Que pasaria ahi?

 productsRouter.put("/:pid",async (req,res)=>{
    try {
        console.log(req.body);
        const {pid} = req.params
        const {product} = req.body
        console.log((product));
        console.log(pid)
        const prod = await (products.updateProduct(parseInt(pid),product))
        res.json({product:prod})
    } catch (error) {
        console.log(`hubo un error: ${error}`);
    }
})

 // DELETE
 productsRouter.delete("/:pid",async (req,res)=>{
    try {
        console.log(req.params);
        const {pid} = req.params
        console.log(pid)
        const prod = await (products.deleteProduct(parseInt(pid)))
        res.json({product:prod})

    } catch (error) {
        console.log(`hubo un error: ${error}`);
    }
 
})


    //----
        
          // pending preguntas para el profe! 
              //  como valido el tipo de variable string number? con typeof? 
              // o como lo defino en la class Product ya y que se controle automaticamente?? Lo mismo con la definición de si el campo es obligatorio o opcional. 
              //  Como seteo status a un valor por default true? 
        
         
 


export default productsRouter