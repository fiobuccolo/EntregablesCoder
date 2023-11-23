import express from 'express'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
const PORT = 8080


// import de rutas
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";

// Routes
app.use("/api/carts",cartsRouter)
app.use("/api/products",productsRouter)


app.get("/", async (req,res)=>{ 
    res.send("Hola")
})


app.listen(PORT, ()=>{console.log(`Server listenin in port ${PORT}`)})











