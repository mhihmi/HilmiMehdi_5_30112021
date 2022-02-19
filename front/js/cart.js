// document.addEventListener('DOMContentLoaded', function () {
let cart = new Cart();
// });

let cartIDs = cart.getListProductId();

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
                    function totalOrder() {
                        document.querySelector("#totalQuantity").insertAdjacentHTML('beforeend', cart.getNumberProduct());
                        document.querySelector("#totalPrice").insertAdjacentHTML('beforeend', cart.getTotalPrice());
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
                            location.reload();
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
                            location.reload();
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
