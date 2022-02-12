// Créons un panier au chargement de la page (cf class dans cartfunctions.js)
// document.addEventListener('DOMContentLoaded', function () {
let cart = new Cart();
// let cart = JSON.parse(localStorage.getItem("cart"));
// });

// Retrouvons nos éléments dynamiques dans le DOM
let cartItems = document.querySelector("#cart__items");
let totalPrice = document.querySelector("#totalPrice");
let totalQuantity = document.querySelector("#totalQuantity");

const productID = cart.cart[1].id;
console.log(productID);

// Récupération du prix depuis l'API
loadConfig().then(data => {
    config = data;
    fetch(config.host + `/api/products/${productID}`) // <==>  fetch("http://localhost:3000/api/products/")
        .then(data => data.json()) // Ici on récupère des données brutes au format texte pour les transformer en objet de données au format json
        .then(Product => { // ici on récupère la liste de produits au format data.json
            // console.log(jsonProduct); // On vérifie si le fetch a fonctionné

        })
        .catch((error) => {
            console.log(`ERREUR : ${error}`);
        });
})

// Injection des fiches produits du panier dans le DOM
if (cart == null) {
    let message = document.createElement("p");
    message.innerHTML = "Votre panier est vide !";
    cartItems.appendChild(message);
    // console.log("Le panier est vide !")
} else {
    for (let product of cart.cart) {
        cartItems.innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                                                                <div class="cart__item__img">
                                                                <img src="${product.image}" alt="${product.altTxt}">
                                                                </div>
                                                                <div class="cart__item__content">
                                                                <div class="cart__item__content__description">
                                                                    <h2>${product.name}</h2>
                                                                    <p>${product.color}</p>
                                                                    <p>${product.price} €</p>
                                                                </div>
                                                                <div class="cart__item__content__settings">
                                                                    <div class="cart__item__content__settings__quantity">
                                                                    <p>Qté : ${product.quantity}</p>
                                                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                                                                    </div>
                                                                    <div class="cart__item__content__settings__delete">
                                                                    <p class="deleteItem">Supprimer</p>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </article>`;
        totalQuantity.innerHTML = cart.getNumberProduct();
    }
};

// Suppression d'un produit
const deleteProducts = document.querySelectorAll(".deleteItem");  // si je la défini avec les autres en haut, ça fonctionne pas !

for (const deleteBtn of deleteProducts) { // on itère sur un NodeList Object avec querySelectorAll
    deleteBtn.addEventListener("click", () => {
        // dataID = deleteBtn.closest("article").getAttribute("data-id");
        console.log(GetClosestProperties(deleteBtn));
    })
};

// récupération des id/color dans le DOM
function GetClosestProperties(e) {
    let id = e.closest("article").getAttribute("data-id");
    let color = e.closest("article").getAttribute("data-color");
    return [id, color];
};