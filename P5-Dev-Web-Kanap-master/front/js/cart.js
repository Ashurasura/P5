let product = (id, quantity, color) => {
  return {
    id: id,
    quantity: quantity,
    color: color
  }
};
let panier = [];
let tempProduct = JSON.parse(localStorage.getItem('panier'));
let totalQuantity = 0;
let totalPrice = 0;

async function getCart() {
  if (tempProduct !== null) {
    for (let i = 0; i < tempProduct.length; i++) {
      const response = await fetch("http://localhost:3000/api/products/" + tempProduct[i].id)
      const cart = await response.json();
      let container = document.querySelector("#cart__items");
      container.innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src=${cart.imageUrl} alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${cart.name}</h2>
            <p>${tempProduct[i].color}</p>
            <p>${cart.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" id="itemQuantity" name="itemQuantity" min="1" max="100" value=${tempProduct[i].quantity}>
            </div>
            <div class="cart__item__content__settings__delete">
              <button id="deleteItem" type="button" data-id="${i}" onclick="getTip(this)">Supprimer</button>
            </div>
          </div>
        </div>
      </article>`
      totalPrice += cart.price * tempProduct[i].quantity;
    }
    for (let i = 0; i < tempProduct.length; i++) {
      totalQuantity += Number(tempProduct[i].quantity);
    }
    let quantity = document.querySelector("#totalQuantity");
    quantity.innerHTML += `${totalQuantity}`
    let price = document.querySelector("#totalPrice");
    price.innerHTML += `${totalPrice}`
  } else {
    console.log("Panier Vide");
  }
} getCart();

function getTip(button) {
  let id = button.getAttribute("data-id");
  tempProduct.splice(id, 1);
  localStorage.removeItem('panier');
  localStorage.setItem('panier', JSON.stringify(tempProduct));
  document.location.href = `./cart.html`;
}