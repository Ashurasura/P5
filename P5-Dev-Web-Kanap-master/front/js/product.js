let search = new URLSearchParams(window.location.search);
let productsId = search.get("id");

async function getArticle(){
    fetch("http://localhost:3000/api/products/"+ productsId)
    .then(function(response){
        return response.json();
    })
    .then(function(article){
        let container = document.querySelector(".item__img");
        container.innerHTML += `<img src=${article.imageUrl} alt=${article.altTxt}>`
        return article;
    })
}
getArticle();







/*<img src="../images/logo.png" alt="Photographie d'un canapé">
Nom du produit
42
Dis enim malesuada risus sapien gravida nulla nisl arcu.
<option value="vert">vert</option>
<option value="blanc">blanc</option>
*/


/* DIFFERENCE ICI */


/*<div class="item__img">
              <!-- <img src="../images/logo.png" alt="Photographie d'un canapé"> -->
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title"><!-- Nom du produit --></h1>
                <p>Prix : <span id="price"><!-- 42 --></span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description"><!-- Dis enim malesuada risus sapien gravida nulla nisl arcu. --></p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Choisir une couleur :</label>
                  <select name="color-select" id="colors">
                      <option value="">--SVP, choisissez une couleur --</option>
<!--                       <option value="vert">vert</option>
                      <option value="blanc">blanc</option> --></select>*/