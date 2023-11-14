import express from 'express'
import {ProductManager} from './productManager.js'
import { Product } from './productManager.js';

const app = express();
const products =  new ProductManager('products.json')

const PORT = 5000


app.get("/", async (req,res)=>{ 
    res.send("Hola")
})
app.get("/products", async (req,res)=>{ 
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
app.get("/products/:pid",async (req,res)=>{
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


app.listen(PORT, ()=>{console.log(`Server listenin in port ${PORT}`)})



async function pruebas() {
    console.log('pruebas');
    console.log("agreganto producto manzana")
    const prueba1 = await products.addProduct(new Product("manzana","manzana deliciosa",20,"er.com","ye44",40));
    console.log(prueba1);
 //---------
    console.log("agregando producto con mismo codigo -- deberia dar error")
    const prueba2 = await products.addProduct(new Product("pera","pera deliciosa",20,"eui.","ye44",20))
    console.log(prueba2);
 //--------- 
    console.log("agregando otro producto para ver si incrementa el id")
    const prueba3 = await products.addProduct(new Product("pera","pera deliciosa",20,"dsf","le23",20))
    console.log(prueba3);
 //---------
    console.log("Buscando por id 1")
     const prueba4 = await products.getProductById(1)
     console.log(prueba4);
 //---------
     console.log("buscando por id 3 que no existe-- deberia dar error")
     const prueba5 = await products.getProductById(3)
     console.log(prueba5);
 //---------
    console.log (await products.getProducts())
 //---------
    console.log("update de product")
    const prueba6 = await products.updateProduct(2,{tittle: "pera",description:"pera deliciosa",price:20,thumbail:"dsf",code:"le23",stock:20})
    console.log(prueba6);
 //---------
    console.log("delete de product")
    const prueba7 = await products.deleteProduct(2)
    console.log(prueba7);
    //---------
    console.log("get products");
    console.log (await products.getProducts())
  }
  
  pruebas();

// PRUEBAS
//console.log("agreganto producto manzana")
//products.addProduct(new Product("manzana","manzana deliciosa",20,"er.com","ye44",40))
//---------
//console.log("agregando producto con mismo codigo -- deberia dar error")
//products.addProduct(new Product("pera","pera deliciosa",20,"eui.","ye44",20))
//---------
 //console.log("agregando otro producto para ver si incrementa el id")
 //products.addProduct(new Product("pera","pera deliciosa",20,"dsf","le23",20))
//---------
 //console.log("Buscando por id 1")
 //console.log(products.getProductById(1))
//---------
//console.log("buscando por id 3 que no existe-- deberia dar error")
//console.log(products.getProductById(3))
//---------
 //console.log(products.getProducts())
//---------
 //console.log("update de product")
 //products.updateProduct(2,{tittle: "pera",description:"pera deliciosa",price:20,thumbail:"dsf",code:"le23",stock:20})
//---------
 //console.log("delete de product")
 //manejadorProducts.deleteProduct(2)
//---------
 //console.log(products.getProducts())

 

