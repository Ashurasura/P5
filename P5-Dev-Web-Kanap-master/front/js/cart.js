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
              <button id="deleteItem" type="button" data-id="${i}" onclick="getId(this)">Supprimer</button>
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

function getId(button) {
  let id = button.getAttribute("data-id");
  tempProduct.splice(id, 1);
  localStorage.removeItem('panier');
  localStorage.setItem('panier', JSON.stringify(tempProduct));
  document.location.href = `./cart.html`;
}

function confirmation() {
  const confirmationBtn = document.getElementById("order");
  confirmationBtn.addEventListener("click", function () {
    const form = document.querySelector(".cart__order__form")
    let products = [] 
    tempProduct.forEach((order) => {
    products.push(order.id);
    });
    console.log (products);
    let contact = {
      firstName: form.firstName.value, 
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.city.value,
    };
   console.log (contact);
    if(form.firstName.value != "" && form.lastName.value != "" && form.address.value != "" && form.city.value != "" && form.email.value != "") {
      let orderMade = { contact, products };
  

  fetch((`http://localhost:3000/api/products/order`),{
          method: "POST",
          headers :{'Accept':'application/json','Content-type':'application/json'
          },
          body : JSON.stringify(orderMade)
      })
      .then(res =>{
          return res.json();
      })
      .then((confirm)=>{
        //localStorage.removeItem('product');
        window.location.replace(`confirmation.html?order=${confirm.orderId}`);
      })
      .catch((error)=>{
          //alert(error);
          console.log(error);
      })
    } else {
      window.alert("veuillez remplir les informations");
    }
  });
} confirmation();