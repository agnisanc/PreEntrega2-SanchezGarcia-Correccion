import express from 'express';
import { ProductManager } from './productManager.js';
import { CartManager } from './cartManager.js';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import realRenderProductsRouter from "./routes/realRenderProducts.js"
import homeRouter from "./routes/homeProducts.js"
import path from "path";
import __dirname from './dirname.js';
import handlebars from "express-handlebars"
import { socketOn } from "./socket.js";


const PORT = 8080;

const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

//Configuracion de app

app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.resolve(__dirname, "../public")));

//Routes

app.use("/", homeRouter);
app.use("/realtimeproducts", realRenderProductsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter );

//Handlebars

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        defaultlayout: "main",
    })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

//Puerto
const httpServer = app.listen(PORT, (req, res) =>{
    console.log(`Server listening to port: http://localhost:${PORT}`);
});

socketOn(httpServer);
