class ProductManager  {
    
    constructor (){
        this.products = [] 
    }

    // METODOS
    getProducts(){
        return this.products
    }
    addProduct(product){
        console.log(product.code)

        const code = this.products.find((prod) => prod.code === product.code);

       // if(this.products.includes(product.code)){
      if(code){
            console.log("Ya existe el codigo de producto")
            return "Ya existe el codigo de producto"
        }
        if(this.products.length === 0){
            product.id=1;
        }else{
            product.id = this.products[this.products.length-1].id +1
        }
        this.products.push(product)
    } 

    getProductById(productId){

        const product = this.products.find((product) => product.id === productId);
        if(!product){
            
            return "No existe el product"
        }
        return product
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


const manejadorProducts = new ProductManager();

console.log(
    "agreganto producto manzana"
)
manejadorProducts.addProduct(
    new Product("manzana","manzana deliciosa",20,"","ye44",40)
)

console.log(
    "agregando producto con mismo codigo -- deberia dar error"
)
 manejadorProducts.addProduct(
    new Product("pera","pera deliciosa",20,"","ye44",20)
 )


 console.log("agregando otro producto para ver si incrementa el id")

 manejadorProducts.addProduct(
     new Product("pera","pera deliciosa",20,"","le23",20)
 )

 console.log("Buscando por id 1")

 console.log(manejadorProducts.getProductById(1))

 console.log("buscando por id 3 que no existe-- deberia dar error")

console.log(manejadorProducts.getProductById(3))


 console.log(manejadorProducts.getProducts())




 /// FEEDBACK ENTREGA 1:
 /*
Hola, Fiorella.

Está muy bien tu trabajo, felicitaciones.

Recordá que a partir de la próxima entrega es requisito entregar a través de GitHub.



En cuanto a tu código, te comparto algunas sugerencias para mejorar:

Método addProduct:

Falta validar que todos los campos sean obligatorios, como pide la consigna.



A la hora de enviar a ser posible quitá el código que ya no se use, por legibilidad. Por ej la línea 16



Se puede usar desestructuración para mejorar la legibilidad, por ejemplo:

addProduct(product){

 const {title,description,price,thumbnail,code,stock} = product;

De esta manera tenés todos los campos del producto en variables independientes title, description, price, etc... Y no tenes que hacer product.title, product.description, product.price, etc.



Para hacer la validación del code, usaría some en lugar de find para verificar si existe algún producto con el código repetido.

some devuelve true o false según se cumpla la condición o no. find trae el objeto encontrado. En este caso, ya que no necesitas trabajar con el producto, solo saber si existe, some sería más indicado.

De todas formas es un detalle, solo con el propósito de profundizar un poco sobre los métodos de arrays.

const productExists = this.products.some(prod => prod.code === code);



La asignación de id al producto se puede simplificar usando el operador ternario, quedando algo así:

 product.id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;

Igual es un detalle, si te resulta confuso y preferís seguir usando if / else esta perfecto.



Es conveniente devolver algo en caso de éxito, por ej el id del nuevo producto agregado o el producto completo.



Eso es todo,

saludos!

 */