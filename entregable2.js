

const fs = require("fs")
class ProductManager  {

    constructor (fileName){
        this.fileName= fileName
        if(fs.existsSync(fileName)){
            try {
                let products = fs.readFileSync(fileName,"utf-8")
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
            await fs.promises.writeFile(this.fileName,JSON.stringify(data,null, '\t'))
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
        const {title,description,price,thumbnail,code,stock} = product;
       if(!product.code ||!product.title ||!product.description ||!product.price ||!product.thumbail ||!product.stock ){
        console.log("Datos incompletos")
        return "Datos incompletos"
       }
        console.log(code)

        const productExists = this.products.some(prod => prod.code === code);
      if(productExists){
            console.log("Ya existe el codigo de producto")
            return "Ya existe el codigo de producto"
        }
    
        product.id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        this.products.push(product)

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
    
    


class Product{
    constructor(title,description,price,thumbail,code, stock){
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbail = thumbail,
        this.code = code,
        this.stock = stock
    }
}


// PRUEBAS



const manejadorProducts = new ProductManager("./Products.json");


console.log(
    "agreganto producto manzana"
)
manejadorProducts.addProduct(
    new Product("manzana","manzana deliciosa",20,"er.com","ye44",40)
)


console.log(
    "agregando producto con mismo codigo -- deberia dar error"
)
 manejadorProducts.addProduct(
    new Product("pera","pera deliciosa",20,"eui.","ye44",20)
 )


 console.log("agregando otro producto para ver si incrementa el id")

 manejadorProducts.addProduct(
     new Product("pera","pera deliciosa",20,"dsf","le23",20)
 )

 console.log("Buscando por id 1")

 console.log(manejadorProducts.getProductById(1))

 console.log("buscando por id 3 que no existe-- deberia dar error")

console.log(manejadorProducts.getProductById(3))


 console.log(manejadorProducts.getProducts())

 console.log("update de product")

 manejadorProducts.updateProduct(2,{tittle: "pera",description:"pera deliciosa",price:20,thumbail:"dsf",code:"le23",stock:20})

 console.log("delete de product")
 manejadorProducts.deleteProduct(2)

console.log(manejadorProducts.getProducts())