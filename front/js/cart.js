/**
 * @file cart.js is for cart page : to update cart and send form order
 * @author Medivix
 * @see <a href="https://github.com/mhihmi/HilmiMehdi_5_30112021" rel="noopener noreferrer" target="_blank"> Repo Git </a>
 */

let cart = new Cart();

//Call API to get Price Information
ApiManager.init()
    .then(() => {
        ApiManager.getAllProducts()
            .then(() => {
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
                    }
                    totalOrder();

                    /**
                     * @property {function} getClosestProperties Function to Get Closest Id/Color from each DOM article
                     * @global
                     * @param {HTMLElement} node - the html element we want the closest Id & Color 
                     * @returns {Array} Array with closest id and color of targeted element
                     */
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
                        })
                    })
                };
            })
            .catch((error) => {
                console.log(`ERROR Get Product Price: ${error}`);
            })
    })

/**
 * @property {function} badgeDisplay Display Badge on cart button 
 * @returns void
 */
function badgeDisplay() {
    if (cart == null || cart.cart == 0) {
        document.querySelector("#numberInCart").classList.remove('displayBadge')
    } else {
        document.querySelector("#numberInCart").classList.add('displayBadge')
        document.querySelector("#numberInCart").value = cart.getNumberProduct()
    }
}
badgeDisplay();

// Form Validation
const form = document.querySelector(".cart__order__form");
const formInputs = form.querySelectorAll("input");

const patterns = {
    firstName: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/g, // First Letter Caps, - ' and spaces authorized
    lastName: /^[A-Z]*$/g,  // All Caps Letters
    address: /^[a-zA-ZÀ-ÿ0-9\s,'-]*$/g,
    city: /^[A-Z]+(?:[\s-][A-Z]+)*$/g, // Full Caps
    email: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/ // Text, Numbers, @, -, _, .
}

const message = {
    firstName: "Première lettre en capitale",
    lastName: "Nom de famille capitales",
    address: "Numéro + nom de la rue/boulevard/impasse etc...",
    city: "Nom de la ville entièrement en capitales",
    email: "Merci de renseigner une adresse mail valide !",
}

/**
 * Function to validate input with Regex
 * @param {HTMLElement} field Targeted Element to control  
 * @param {RegExp} regex Regex rule
 */
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

//Call API on Button Click event to Post Order and get OrderId
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const products = cart.getListProductId();

    /**
     * Contact Informations
     * @type {{firstName: string, lastName: string, address: string|number, city: string, email: string}}
     */
    const contact = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        address: this.address.value,
        city: this.city.value,
        email: this.email.value
    };

    const order = {
        contact,
        products,
    };

    console.log(order);

    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    };

    if (form.reportValidity()) {
        ApiManager.init()
            .then(() => {
                ApiManager.postOrder(postOptions)
                    .then((orderId) => {
                        // localStorage.setItem("orderId", JSON.stringify(orderId));
                        console.log(orderId);
                        document.location.href = `confirmation.html?id=${orderId}`;
                    })
                    .catch((error) => {
                        console.log(`ERROR Post Order: ${error}`);
                    })
            })
    }
})
