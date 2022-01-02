async function kanap(){
    let call = await fetch("http://localhost:3000/api/products");
    let response = await call.json();
    return response;
}
kanap();

async function kanapProducts(){
    let products = await kanap();
    let container = document.getElementById("items");
    products.forEach (display => {
        let content = `
        <a href="./product.html?id=${display._id}">
        <article>
        
        <img src="${display.imageUrl}" alt= "${display.name}">
        <h3 class="productName">${display.name}</h3>
        <p class="productDescription">${display.description}</p>
        </article>  
        </a>
        `
    container.innerHTML += content;
});
}
kanapProducts();