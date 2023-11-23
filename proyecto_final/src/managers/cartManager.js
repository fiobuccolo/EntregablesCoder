
import { existsSync, readFileSync, promises } from "fs"
export class CartManager  {

    constructor (fileName){
        this.fileName= fileName
        if(existsSync(fileName)){
            try {
                let carts = readFileSync(fileName,"utf-8")
                this.carts = JSON.parse(carts)
            } catch (error) {
                this.carts = [] 
            }
        }else{
        this.carts = [] 
        }
    }

    // METODOS

    async saveFile(data){
        try {
            await promises.writeFile(this.fileName,JSON.stringify(data,null, '\t'))
            return true
        } catch (error) {
            console.log(error)
            return false;
        }
    }
     

    getCarts(){
        return this.products
    }

    async addCart(){
        try{
            
            const newCart = new Cart()
             newCart.id = this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1;
            this.carts.push(newCart)

              const response =  await this.saveFile(this.carts)
              console.log(this.carts)
              if(response){
                    return ({message: `cart created`,cart: newCart})
                }else{
                    console.log("Hubo un error");
                
            }
          }  catch(error){  console.log(`hubo un error: ${error}`);}
                }
      


    getCartById(cartId){
        const cart = this.carts.find((cart) => cart.id === cartId);
        if(!cart){
            console.log(`El producto con ID ${cartId} no existe`)
            return "No existe el product"
        }
        return cart
     }

     async updateCart(cartId,productId,quantity){
        try{
            // VALIDAR QUE TANTO CART COMO PRODUCTO EXISTAS
            const indiceCart = this.carts.findIndex(cart => cart.id === cartId);
            const indiceProduct = this.products.findIndex(p => p.id === productId);
            if(indiceCart < 0 ||indiceProduct < 0 ){return "El id de producto o de cart no existe"}

             // TO DO logica de si el producto ya esta en el carrito para saber si lo agrego o le sumo cantidad
    
            if (indiceCart != -1) {
                // TO DO logica de agregar producto al carrito
                const response = await this.saveFile(this.carts)
                if(response){
                    console.log("Cart actualizado")
                    return cart
                }else{
                    console.log("Hubo un error");
                }
            } else
                console.log(`El producto con ID ${id} no existe`)
                return "No existe el product"
        } 
        catch (error) {
            console.log(error);
        }
     }

     async deleteCart(cartId){
        try {
            const indice = this.carts.findIndex(cart => cart.id === cartId);
            if (indice != -1) {
            
                       this.carts.splice(indice,1)

                const response = await this.saveFile(this.carts)
                if(response){
                    console.log("Producto eliminado")
                    return ("Producto eliminado")

                }
             else
                console.log(`El carts con ID ${id} no existe`)
                return "No existe el product"
        } 

        } catch (error) {
            console.log("Hubo un error");
            return error
        }
     }

    }
    
    

// TODO la class del cart
export class Cart{
    constructor(){
        
    }
}

   

