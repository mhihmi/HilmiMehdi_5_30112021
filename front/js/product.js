// document.addEventListener('DOMContentLoaded', function () {
let cart = new Cart();
// });

// Récupération de l'id dans l'URL
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

                // J'ai essayé ainsi mais fonctionne po !
                // let content = product.colors.map(product => product.generateColorDom());
                // document.querySelector("#colors").insertAdjacentHTML("beforeend", content.join(""));

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
                    location.reload();
                });
            })
            .catch((error) => {
                console.log(`ERREUR : ${error}`);
            })
    })

function badgeDisplay() {
    if (cart == null) {
        document.querySelector("#numberInCart").classList.remove('.displayBadge')
    } else {
        document.querySelector("#numberInCart").classList.add('.displayBadge')
        document.querySelector("#numberInCart").value = cart.getNumberProduct()
    }
}
badgeDisplay();    