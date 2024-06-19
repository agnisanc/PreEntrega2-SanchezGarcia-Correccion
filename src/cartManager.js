import {promises as fs} from 'fs'
import {v4 as uuidv4 } from 'uuid'

export class CartManager {
    constructor(){
        this.path = './src/db/carts.json';
        this.carts = []
    }

    getCarts = async () => {
        const response = await fs.readFile(this.path,'utf-8')
        const responseJSON = JSON.parse(response)
        return responseJSON
    }

    getCartProducts = async (id) => {
        const carts = await this.getCarts()
        
        const cart = carts.find(cart => cart.id == id)

        if (cart) {
            return cart.products
        } else {
            console.log(`The cart with id: ${id} could not be found`)
        }
    }

    newCart = async () => {
        const id = uuidv4()
        const newCart = {id, products: []}

        this.carts = await this.getCarts()
        this.carts.push(newCart)

        await fs.writeFile(this.path, JSON.stringify(this.carts))
        return newCart;
    }

    addProductToCart = async (cart_id, product_id) => {
        const carts = await this.getCarts()
        const index = carts.findIndex(cart => cart.id == cart_id)

        if (index != -1) {
            const cartProducts = await this.getCartProducts(cart_id)
            const addedProductIndex = cartProducts.findIndex(product => product.product_id == product_id)

            if (addedProductIndex != -1 ) {
                cartProducts[addedProductIndex].quantity = cartProducts[addedProductIndex].quantity + 1
            } else {
                cartProducts.push({product_id, quantity : 1})
            }

            carts[index].products = cartProducts

            await fs.writeFile(this.path, JSON.stringify(carts))
            console.log('The product was successfully added');
        } else {
            console.log('The cart could not be found')
        }
    }

}
