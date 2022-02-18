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
                };
            })
            .catch((error) => {
                console.log(`ERREUR : ${error}`);
            })
    })

// Delete a Product from Cart
const deleteButtons = document.querySelectorAll(".deleteItem");

// récupération des id/color dans le DOM
// function GetClosestProperties(e) {
//     let _id = e.closest("article").dataset.id;
//     let color = e.closest("article").dataset.color;
//     return [_id, color];
// };

// for (const deleteBtn of deleteButtons) {
//     let cartProduct = GetClosestProperties(deleteBtn);
//     let articleToRemove = deleteBtn.closest("article");
//     product = {
//         _id: `${cartProduct[0]}`,
//         color: `${cartProduct[1]}`
//     }
//     deleteBtn.addEventListener("click", () => {
//         // dataID = deleteBtn.closest("article").getAttribute("data-id");
//         cart.remove(product);
//         // articleToRemove.remove();
//     })
// };
// cart.remove({_id:"055743915a544fde83cfdfc904935ee7",color:"Red"})
