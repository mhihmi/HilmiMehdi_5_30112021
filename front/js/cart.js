// Créons un panier au chargement de la page (cf class dans cartfunctions.js)
// document.addEventListener('DOMContentLoaded', function () {
let cart = new Cart();
// let cart = JSON.parse(localStorage.getItem("cart"));
// });

let cartItems = document.querySelector("#cart__items");

// Injection dans le DOM
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
    }
}
