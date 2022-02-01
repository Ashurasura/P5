const Url = window.location.search;
const urlProduct = new URLSearchParams(Url); 
const orderId = urlProduct.get("order");
let order = document.querySelector("#orderId");
order.textContent = orderId;
localStorage.clear();