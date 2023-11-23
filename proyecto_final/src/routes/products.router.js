import { Router } from "express";

import {Product, ProductManager } from "../managers/productManager.js";
const products =  new ProductManager('files/products.json')

const productsRouter = Router(); 


productsRouter.get("/", async (req,res)=>{ 
    try {
         console.log(req.params); // :
         console.log(req.query); // ?key=valor&key2=valor
         const prods = await products.getProducts()
         console.log(prods)
         const {limit} = req.query
         console.log(limit);
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


 productsRouter.post("/",async (req,res)=>{
        try{ 
            const {title,description,price,thumbnail,code,stock,status,category} = req.body
            console.log("validacion de inputs")
            if(!title || !description || !price || !category || !stock || !code) {
                return res.json({
                    message:  "missing data"
                })
               
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



    //----
        
          // pending preguntas para el profe! 
              //  como valido el tipo de variable string number? con typeof? 
              // o como lo defino en la class Product ya y que se controle automaticamente?? Lo mismo con la definición de si el campo es obligatorio o opcional. 
              //  Como seteo status a un valor por default true? 
        
         
 


export default productsRouter