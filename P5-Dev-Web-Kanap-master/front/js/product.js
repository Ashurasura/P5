let search = new URLSearchParams(window.location.search);
let productsId = search.get("id");
let product = (id, quantity, color) => {
  return {
    id: id,
    quantity: quantity,
    color: color
  }
};
let panier = [];
let tempProduct = JSON.parse(localStorage.getItem('panier'));

async function getArticle() {
  const response = await fetch("http://localhost:3000/api/products/" + productsId)
  const article = await response.json();
  let container = document.querySelector(".item__img");
  container.innerHTML += `<img src=${article.imageUrl} alt=${article.altTxt}>`
  let name = document.querySelector("#title");
  name.innerHTML += article.name
  let price = document.querySelector("#price");
  price.innerHTML += article.price
  let description = document.querySelector("#description");
  description.innerHTML += article.description
  let colors = document.querySelector("#colors")
  for (let color of article.colors) {
    colors.innerHTML += `<option value="${color}">${color}</option>`;
  }
}
getArticle();



function addToCart() {
  const addToCartBtn = document.getElementById("addToCart");
  addToCartBtn.addEventListener("click", function () {
    const colorChoice = document.getElementById("colors").value;
    const addQuantity = document.getElementById("quantity").value;
    if (colorChoice === "" || addQuantity === 0) {
      window.alert("veuillez remplir les champs suivant : 'couleur', 'Nombre'");
    } else if (tempProduct === null) {
      panier.push(product(productsId, addQuantity, colorChoice));
      localStorage.setItem('panier', JSON.stringify(panier));
      document.location.href = `./cart.html`;
    } else {
      panier.push(product(productsId, addQuantity, colorChoice));
      for(let i = 0; i < tempProduct.length; i++) {
        panier.push(tempProduct[i]);
      } 
      localStorage.setItem('panier', JSON.stringify(panier));
      document.location.href = `./cart.html`;
    }
  });
}
addToCart();