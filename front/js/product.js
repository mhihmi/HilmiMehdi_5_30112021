/**
 * @file product.js is for product page : to display product information getting Id in URL and adding it to Cart with color & quantity 
 * @author Medivix
 * @see <a href="https://github.com/mhihmi/HilmiMehdi_5_30112021" rel="noopener noreferrer" target="_blank"> Repo Git </a>
 */

let cart = new Cart();

// Get id from URL
const usp = new URLSearchParams(window.location.search);
const productID = usp.get("id");

ApiManager.init()
    .then(() => {
        ApiManager.getProductById(productID)
            .then(product => {

                document.querySelector(".item__img").insertAdjacentHTML('afterbegin', product.generateImageDom());
                document.querySelector("#title").insertAdjacentHTML('afterbegin', product.name);
                document.querySelector("#price").insertAdjacentHTML('afterbegin', product.price);
                document.querySelector("#description").insertAdjacentHTML('afterbegin', product.description);

                for (let color of product.colors) {
                    let option = document.createElement("option");
                    option.append(`${color}`);
                    option.value = `${color}`;
                    document.querySelector("#colors").appendChild(option);
                }

                // Event Listener on "Ajouter au panier" Button + Warning Message
                document.querySelector("#addToCart").addEventListener("click", function () {
                    if (document.querySelector("#colors").value == "" || document.querySelector("#quantity").value <= 0 || document.querySelector("#quantity").value > 100) {
                        let warning = document.createElement("p");
                        warning.innerHTML = "Merci d'indiquer une couleur et une quantité comprise entre 1 et 100";
                        document.querySelector(".item__content__settings").appendChild(warning);
                        setTimeout(function () { warning.remove() }, 3000);
                    } else {
                        product.quantity = parseInt(document.querySelector("#quantity").value);
                        product.color = document.querySelector("#colors").value;
                        cart.add(product);
                    }
                    badgeDisplay();
                });
            })
            .catch((error) => {
                console.log(`ERREUR : ${error}`);
            })
    })

function badgeDisplay() {
    if (cart == null || cart.cart == 0) {
        document.querySelector("#numberInCart").classList.remove('displayBadge')
    } else {
        document.querySelector("#numberInCart").classList.add('displayBadge')
        document.querySelector("#numberInCart").value = cart.getNumberProduct()
    }
}
badgeDisplay();    