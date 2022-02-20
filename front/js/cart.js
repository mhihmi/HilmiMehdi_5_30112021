// document.addEventListener('DOMContentLoaded', function () {
let cart = new Cart();
// });

let cartIDs = cart.getListProductId();
// console.log(cartIDs);

//Call API to get Price Information
ApiManager.init()
    .then(() => {
        ApiManager.getAllProducts()
            .then(() => {
                // console.log(listProduct);
                if (cart == null) {
                    let message = document.createElement("p");
                    message.innerHTML = "Votre panier est vide !";
                    document.querySelector("#cart__items").appendChild(message);

                } else {
                    // Inject Dom Product Cards from Cart with their Price from API
                    for (let productInStorage of cart.cart) {
                        productInStorage = new Product(productInStorage);
                        productInStorage.price = ApiManager.findProductPriceById(productInStorage._id);
                        document.querySelector("#cart__items").insertAdjacentHTML('beforeend', productInStorage.generateCartItem());
                    }

                    // Display Total Price and articles
                    document.querySelector("#totalQuantity").insertAdjacentHTML('beforeend', cart.getNumberProduct());
                    document.querySelector("#totalPrice").insertAdjacentHTML('beforeend', cart.getTotalPrice());

                    function totalOrder() {
                        document.querySelector("#totalQuantity").innerHTML = cart.getNumberProduct();
                        document.querySelector("#totalPrice").innerHTML = cart.getTotalPrice();
                        // Appel à une method de la class Cart qui fait elle même appel à une method de la class ApiManager ?
                    }
                    totalOrder();

                    // Get Closest Id/Color from each DOM article
                    function getClosestProperties(e) {
                        let id = e.closest("article").dataset.id;
                        let color = e.closest("article").dataset.color;
                        return [id, color];
                    };

                    // Delete a Product from Cart
                    const deleteButtons = document.querySelectorAll(".deleteItem");

                    deleteButtons.forEach(deleteBtn => {
                        let articleToRemove = deleteBtn.closest("article");
                        let cartProduct = getClosestProperties(deleteBtn);
                        let product = {
                            _id: `${cartProduct[0]}`,
                            color: `${cartProduct[1]}`
                        }
                        deleteBtn.addEventListener("click", () => {
                            articleToRemove.remove();
                            cart.remove(product);
                            totalOrder();
                            badgeDisplay()
                        })
                    });

                    // Change Quantity
                    const quantityInputs = document.querySelectorAll(".itemQuantity");

                    quantityInputs.forEach(quantityInput => {
                        let cartProduct = getClosestProperties(quantityInput);
                        let product = {
                            _id: `${cartProduct[0]}`,
                            color: `${cartProduct[1]}`
                        }
                        quantityInput.addEventListener("change", () => {
                            cart.changeQuantity(product, quantityInput.value)
                            totalOrder();
                            badgeDisplay()
                            // location.reload();
                        })
                    })
                };
            })
            .catch((error) => {
                console.log(`ERREUR : ${error}`);
            })
    })

// cart.remove({_id:"055743915a544fde83cfdfc904935ee7",color:"Red"})

// Badge on cart button display
function badgeDisplay() {
    if (cart == null) {
        document.querySelector("#numberInCart").classList.remove('.displayBadge')
    } else {
        document.querySelector("#numberInCart").classList.add('.displayBadge')
        document.querySelector("#numberInCart").value = cart.getNumberProduct()
    }
}
badgeDisplay();

// Form Validation
const form = document.querySelector(".cart__order__form");
const formInputs = form.querySelectorAll("input");
console.log(formInputs);

const patterns = {
    firstName: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/g, // First Letter Caps, - ' and spaces authorized
    lastName: /^[A-Z]*$/g,  // All Caps Letters
    address: /^[a-zA-ZÀ-ÿ0-9\s,'-]*$/g,
    city: /^[A-Z]+(?:[\s-][A-Z]+)*$/g, // Full Caps
    email: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
}

const message = {
    firstName: "Première lettre en capitale",
    lastName: "Nom de famille capitales",
    address: "Numéro + nom de la rue/boulevard/impasse etc...",
    city: "Nom de la ville entièrement en capitales",
    email: "Merci de renseigner une adresse mail valide !",
}

function validate(field, regex) {
    if (regex.test(field.value)) {
        field.className = "valid";
        field.setCustomValidity("")
    } else {
        field.className = "invalid";
        field.setCustomValidity(message[field.attributes.name.value])
    }
}

formInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
        e.preventDefault();
        validate(e.target, patterns[e.target.attributes.name.value]);
    });
})

