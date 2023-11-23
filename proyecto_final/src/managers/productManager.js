
import { existsSync, readFileSync, promises } from "fs"
export class ProductManager  {

    constructor (fileName){
        this.fileName= fileName
        if(existsSync(fileName)){
            try {
                let products = readFileSync(fileName,"utf-8")
                this.products = JSON.parse(products)
            } catch (error) {
                this.products = [] 
            }
        }else{
        this.products = [] 
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
     

    getProducts(){
        return this.products
    }

    async addProduct(product){
        if(!product){
            return console.log("El product esta vacio");
        }
        console.log(product);
        

        const response = await this.saveFile(this.products)
        if(response){
            console.log("Producto agregado al archivo")
            return product
        }else{
            console.log("Hubo un error");
        }
    } 

    getProductById(productId){
        const product = this.products.find((product) => product.id === productId);
        if(!product){
            console.log(`El producto con ID ${productId} no existe`)
            return "No existe el product"
        }
        return product
     }

     async updateProduct(productId,product){
        try{
            const indice = this.products.findIndex(product => product.id === productId);
            console.log(indice)
            if (indice != -1) {
                const { id, ...rest } = product;
                this.products[indice] = { ...this.products[indice], ...rest };
                const response = await this.saveFile(this.products)
                if(response){
                    console.log("Producto actualizado")
                    return product
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

     async deleteProduct(productId){
        try {
            const indice = this.products.findIndex(product => product.id === productId);
            if (indice != -1) {
            
                       this.products.splice(indice,1)

                const response = await this.saveFile(this.products)
                if(response){
                    console.log("Producto eliminado")
                    return ("Producto eliminado")

                }
             else
                console.log(`El producto con ID ${id} no existe`)
                return "No existe el product"
        } 

        } catch (error) {
            console.log("Hubo un error");
            return error
        }
     }

    }
    
    


export class Product{
    constructor(title,description,price,thumbail,code, stock,status,category){
      
        this.title = title, //string
        this.description = description,//string
        this.price = price, //number
        this.thumbail = thumbail, // array opcionail
        this.code = code, //string
        this.stock = stock //number
        this.status = status //boolean
        this.category = category //string
    }
}

   

