import { Router } from 'express';
import { productManager } from '../server.js';

const productsRouter = Router()

productsRouter.get('/', async (req, res) =>{
    try {
        const { limit } =  req.query;
        const products = await productManager.getProducts()

        if (limit){
            const limitOfProducts = products.slice(0, limit)
            return res.json(limitOfProducts)
        }

        return res.json(products)
    } catch (error) {
        console.log(error)
        res.send('An error occured while trying to get the products.')
    }
})

productsRouter.get('/:pid', async (req, res) =>{
    const { pid } = req.params;
    try {
        const products = await productManager.getProductById(pid)
        res.json(products)

    } catch (error) {
        console.log(error)
        res.send(`An error occured while trying to get the product with id: ${pid}`)
    }
})

productsRouter.post('/', async (req, res) =>{
    try{
        const {id, title, description, price, thumbnail, code, stock, status, category} = req.body;
        const response = await productManager.addProduct({id, title, description, price, thumbnail, code, stock, status, category})
        res.json(response)
    } catch (error){
        console.log(error)
        res.send('An error occured while trying to add a new product.')
    }
})

productsRouter.put('/:pid', async (req, res) =>{
    const { pid } = req.params;

    try{
        const {pid, title, description, price, thumbnail, code, stock, status, category} = req.body;
        const response = await productManager.updateProduct({pid, title, description, price, thumbnail, code, stock, status, category});
        res.json(response)
    } catch (error) {
        console.log(error)
        res.send(`An error occured while trying to update the product with id: ${pid}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try{
        await productManager.deleteProduct(pid)
        res.send('The product was deleted.')
    } catch (error) {
        console.log(error)
        res.send(`An error occured while trying to delete the product with id: ${pid}`)
    }
})


export {productsRouter}