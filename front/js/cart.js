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
                // Inject Dom Product Cards from Cart and their Price from API
                if (cart == null) {
                    let message = document.createElement("p");
                    message.innerHTML = "Votre panier est vide !";
                    document.querySelector("#cart__items").appendChild(message);
                } else {
                    for (let productInStorage of cart.cart) {
                        productInStorage = new Product(productInStorage);
                        productInStorage.price = ApiManager.findProductPriceById(productInStorage._id);
                        document.querySelector("#cart__items").insertAdjacentHTML('beforeend', productInStorage.generateCartItem());
                    }
                    document.querySelector("#totalQuantity").insertAdjacentHTML('beforeend', cart.getNumberProduct());
                    document.querySelector("#totalPrice").insertAdjacentHTML('beforeend', cart.getTotalPrice());
                    // Appel à une method de la class Cart qui fait elle même appel à une method de la class ApiManager ?

                    // Delete a Product from Cart
                    const deleteButtons = document.querySelectorAll(".deleteItem");
                    // console.log(deleteButtons);
                    // récupération des id / color dans le DOM
                    function getClosestProperties(e) {
                        let id = e.closest("article").dataset.id;
                        let color = e.closest("article").dataset.color;
                        return [id, color];
                    };

                    deleteButtons.forEach(deleteBtn => {
                        let cartProduct = getClosestProperties(deleteBtn);
                        let articleToRemove = deleteBtn.closest("article");
                        let product = {
                            _id: `${cartProduct[0]}`,
                            color: `${cartProduct[1]}`
                        }
                        deleteBtn.addEventListener("click", () => {
                            articleToRemove.remove();
                            cart.remove(product);
                        })
                    });
                };
            })
            .catch((error) => {
                console.log(`ERREUR : ${error}`);
            })
    })


// cart.remove({_id:"055743915a544fde83cfdfc904935ee7",color:"Red"})
