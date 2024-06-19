import { Router } from 'express';
import { cartManager } from '../server.js';

const cartsRouter = Router();

cartsRouter.post('/', async (req, res) =>{
    try{
        const response = await cartManager.newCart()
        res.json(response)
    } catch (error){
        res.send('An error occured while trying to create a new cart.')
    }
})

cartsRouter.get('/:cid', async (req, res) =>{
    const {cid} = req.params;
    try{
        const response = await cartManager.getCartProducts(cid)
        res.json(response)
    } catch (error) {
        res.send('An error occured while trying to get the products added in the cart.')
    }
})

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    const {cid, pid} = req.params;

    try{
        await cartManager.addProductToCart(cid, pid)
        res.send('The product was added to the cart.')
    } catch (error) {
        res.send('The product was not added to the cart.')
    }
})

export {cartsRouter}