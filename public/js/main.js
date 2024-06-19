const socket = io();

socket.on("products", (products) => {
    const productsContainer = document.getElementById("tableOfProducts");

if (productsContainer) {
    productsContainer.innerHTML = `
    <tr>
        <th>TITLE</th>
        <th>ID</th>
        <th>DESCRIPTION</th>
        <th>PRICE</th>
        <th>THUMBNAIL</th>
        <th>CODE</th>
        <th>STOCK</th>
        <th>STATUS</th>
        <th>CATEOGRY</th>
    </tr>
    `;
    products.forEach((product) =>{
        productsContainer.innerHTML += `
        <tr>
            <th>${product.title}</th>
            <th>${product.id}</th>
            <th>${product.description}</th>
            <th>${product.price}</th>
            <th>${product.thumbnail}</th>
            <th>${product.code}</th>
            <th>${product.stock}</th>
            <th>${product.status}</th>
            <th>${product.category}</th>
        </tr>
        `
    })
}
});

document.getElementById("addProduct").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const id = document.getElementById("prodId").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const code = document.getElementById("code").value;
    const status = document.getElementById("status").value;
    const stock = document.getElementById("stock").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const category = document.getElementById("category").value;

    socket.emit("newProduct", {
        title,
        id,
        description,
        price,
        code,
        status,
        stock,
        thumbnail,
        category,
    });

    event.target.reset();
});

document.getElementById("deleteProduct").addEventListener("submit", (event) => {
    event.preventDefault();

    //revisar si no es #id
    const deleteId = document.querySelector("#id").value;

    socket.emit("deleteProduct", deleteId);

    event.target.reset();
});

socket.on("response", (response) => {
    const responseContainer = document.getElementById("responseContainer");

    if(response.status === "success") {
        if (response.product) {
            const successMessage = `<h3>Product added.</h3>`;
            responseContainer.innerHTML = successMessage
        } else {
            responseContainer.innerHTML = `<h1>${response.message}</h1>`;
        }
    } else {
        responseContainer.innerHTML = `<h1>${response.message}</h1>`;
        console.error(response.error);
    }
});


