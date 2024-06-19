import { productManager } from "./server.js"
import { Server } from "socket.io";

export const socketOn = (server) => {
    const io = new Server(server);

    io.on("connection", async (socket) =>{
        console.log(`New client ${socket.id} has connected`);

        try {
            const products = await productManager.getProducts();
            socket.emit("products", products);
        } catch (error) {
            socket.emit("response", { status: "error", message: error.message });
        }

        socket.on("newProduct", async (newProduct) => {
            try {
                const addNewProduct = {
                    title: newProduct.title,
                    id: newProduct.id,
                    description: newProduct.description,
                    price: newProduct.price,
                    code: newProduct.code,
                    status: newProduct.status,
                    stock: newProduct.stock,
                    thumbnail: newProduct.thumbnail,
                    category: newProduct.category,
                };
                const pushProduct =await productManager.addProduct(addNewProduct);
                const updatedProduct = await productManager.getProducts();
                io.emit("products", updatedProduct);
                io.emit("response", {
                    status: "success",
                    message: `<h3>Product added.</h3>`,
                    product: addNewProduct,
                });
            } catch (error) {
                io.emit("response", {
                    status: "error",
                    message: error.message,
                });
            }
        });

        socket.on("deleteProduct", async (id) => {
            try {
                const dId = parseInt(id);
                const deleteProduct = await productManager.deleteProduct(dId);
                const updatedProduct = await productManager.getProducts();
                io.emit("products", updatedProduct);
                io.emit("response", {
                    status: "success",
                    message: `<h3>Product deleted.</h3>`,
                });
            } catch (error) {
                io.emit("response", {
                    status: "error",
                    message: error.message,
                });
            }
        });
    });
};