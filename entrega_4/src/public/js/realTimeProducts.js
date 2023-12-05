//instanciar socket del lado del cliente
const socket = io()
console.log(socket);
// emit 1:
socket.emit("message","mensaje desde real time products")

// recepción del emit 1 del server
socket.on("products_list",(data)=>{
    console.log("socket on en products.js");
    console.log(data);
    const div = document.querySelector(".productsList")
    //div.innerHTML = `${data.map((product) => `${product.title} - ${product.description}`)}`
})


// emit 2- agregar producto:
/*
const button =  document.querySelector("#button")
button.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("holiiti");
    const title= document.querySelector("#title")
    console.log(title);
    const description= document.querySelector("#description") 
    const category= document.querySelector("#category") 
    const code= document.querySelector("#code") 
    const price= document.querySelector("#price") 
    const product = {
        title: title.value,
        description: description.value,
        category: category.value,
        code: code.value,
        price: price.value

    }
    console.log("holiiti 2");
    console.log(product);
    socket.emit("products_message",product)
})
*/
