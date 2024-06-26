import { Router } from "express";
import { productManager } from "../server.js";

const router = Router();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home",{
        products,
    });
});

export default router