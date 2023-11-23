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
        // ??? ->> estas validaciones van en el post o en el metodo add??

        const {title,description,price,thumbnail,code,stock,status,category} = req.body
        
        console.log(code)
        if(!code ||!title ||!description ||!price ||!code ||!stock ||!category){
            console.log("Datos incompletos")
            return res.json({ message:"Datos incompletos"})
           }
           console.log("validacion si el prod existe")
        const productExists = this.products.some(prod => prod.code === code);
        if(productExists){
              console.log("Ya existe el codigo de producto")
              return "Ya existe el codigo de producto"
          }
        const product = new Product(title,description,price,thumbnail,code,stock,status,category)
        product.id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        this.products.push(product)

        const Response =  await (products.addProduct(product))
        return res.status(201).json({
            message: "product created",
            product: Response
        })
        
    }  catch(error){  console.log(`hubo un error: ${error}`);}
})

    //----
        
          // pending preguntas para el profe! 
              //  como valido el tipo de variable string number? con typeof? 
              // o como lo defino en la class Product ya y que se controle automaticamente?? Lo mismo con la definición de si el campo es obligatorio o opcional. 
              //  Como seteo status a un valor por default true? 
        
         
 


export default productsRouter