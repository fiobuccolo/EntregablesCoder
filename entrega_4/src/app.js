import express from 'express'
import handlebars from "express-handlebars"
// import de rutas
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from './routes/views.router.js';
import __dirname from './path.js';
// import websocket
import {Server} from "socket.io"
import { ProductManager } from './managers/productManager.js';
const products =  new ProductManager('files/products.json')

const app = express();
const PORT = 8080

const httpServer = app.listen(PORT,()=>console.log(`Server listening on port: ${PORT}`)) 
// Instanciar websocket:
const socketServer = new Server(httpServer)


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+`/public`))

// configurarmos el motor:
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout:"main"
}))

// seteamos nuestro motor
app.set("view engine", "hbs")
app.set("views",__dirname+`/views`) // setemamos la carpeta que el motor va a ser uso

//routes
app.get("/", (req,res)=>{
    let name = "martita"
    res.render("index",{name})
})



// Routes
app.use("/",viewsRouter)
app.use("/api/carts",cartsRouter)
app.use("/api/products",productsRouter)

// Socket communication

socketServer.on("connection",(socketClient)=>{
    console .log("Nuevo cliente conectado");
    // recepcion del emit 1 
    socketClient.on("message",(data)=>{
     console.log(data);
    })
 
    // recepcion del emit 2- agregar producto:
    /*
    socketClient.on("products_message",(data)=>{
    console.log(data);
    products.push(data)
     console.log("antes del emi DE RECEPCION DEL EMIT 2 APP");
     socketClient.emit("products_list",products)
    })
    socketClient.emit("products_list",products)
 */
 })
 










/* FEEDBACK ENTREGA:

Hola, Fiorella:

Está muy bien tu trabajo, felicitaciones.

Hay sólo dos rutas que me dieron error, la update de products y de carts.

Entiendo que estás trabajando en eso, cualquier problema me avisas para ayudarte.

Por lo demás está todo muy bien.

Te comparto algunas observaciones generales:

* Los imports se hacen siempre al principio del archivo. En tu app.js por ejemplo, deberías importar express, las rutas, los demás módulos que vayas a usar y luego el resto del código.

* Habría que configurar nodemon para que ignore los cambios en los archivos json, para que no se reinicie el servidor cada vez que se agrega, modifica o elimina un producto o carrito.

* Si haces pruebas con Postman o Thunder Client, vas a ver que el status de la respuesta siempre es 200. Si ocurre un error, sería conveniente que el código de estado cambie según el tipo de error. Por ejemplo, si no se encuentra un producto, enviar un 404. Si faltan campos al agregar un producto, enviar un 400. Si ocurre un error en el servidor, enviar un 500, etc.

Esto se hace a través del método status. Por ejemplo:

res.status(404).json({ error: 'Producto no encontrado' });

Así mismo se pueden mejorar los mensajes de error, para que sean más descriptivos. Por ejemplo si falta un campo, se podría enviar un mensaje que incluya el nombre del campo que falta.

* No siempre es necesario enviar la respuesta como un objeto.

Por ejemplo, en vez de enviar todos los productos de la siguiente manera:

res.json({products:prods})

Se podría enviar directamente el array:

res.json(prods)

Te lo comento porque en algunos casos la respuesta son varios objetos anidados, lo cual puede ser un poco confuso, sobre todo al conectar la api con el frontend (en caso de hacerlo)

* Al agregar un producto, si no se envía el campo status, debe ser true por defecto. Thumbnail debería validarse como thumbnails.



Eso es todo, espero te sirva.

¡Saludos!
*/