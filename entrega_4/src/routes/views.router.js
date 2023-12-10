
import { Router } from "express";
import { ProductManager, Product } from "../managers/productManager.js";
const products =  new ProductManager('files/products.json')


const viewsRouter = Router();

viewsRouter.get("/products", async(req,res)=>{
    const prods = await products.getProducts()
    console.log(prods);
    res.render("home",{
        title: "Home",
        prods,
        fileCss:"products.css"
      
    })
})
//products in real time
viewsRouter.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts",{
        title:"Real time products",
        fileCss:"products.css"
    })
})

// tengo que agregar un post a productos aca?

viewsRouter.post("/api/realtimeproducts", async (req,res)=>{
    try{ 
        console.log(("estoy por aca"));
        const {title,description,price,thumbnail,code,stock,status,category} = req.body
        console.log("validacion de inputs")
        console.log(title,description,price,thumbnail,code,stock,status,category);
        if(!title || !description || !price || !category || !stock || !code) {
            return res.json({message:  "missing data" })
         }
        console.log("creación de product de inputs")
        const newProduct = new Product(title,description,price,thumbnail,code,stock,status,category)
        console.log(newProduct)
        const response = await products.addProduct(newProduct);
        console.log("hola")
        return res.redirect("/realtimeproducts").json({
            message: response
        })
        .redirect("/realtimeproducts")
    }  catch(error){ throw new Error (error)}
}) 


export default viewsRouter

