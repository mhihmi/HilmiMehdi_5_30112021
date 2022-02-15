// Créons un panier au chargement de la page (cf class dans cartfunctions.js)
// document.addEventListener('DOMContentLoaded', function () {
let cart = new Cart();
// });

// Récupération de l'id dans l'URL + création du productID
const usp = new URLSearchParams(window.location.search);
const productID = usp.get("id");

ApiManager.init()
    .then(() => {
        ApiManager.getProductById(productID)
            .then(product => {
                // console.log(product);
                let image = product.generateImageDom();
                document.querySelector(".item__img").insertAdjacentHTML('afterbegin', image);
                document.querySelector("#title").insertAdjacentHTML('afterbegin', product.name);
                document.querySelector("#price").insertAdjacentHTML('afterbegin', product.price);
                document.querySelector("#description").insertAdjacentHTML('afterbegin', product.description);

                for (let color of product.colors) {  // Loop on color array
                    let option = document.createElement("option"); // create option tag for each color
                    option.append(`${color}`); // adding color data to option tag
                    option.value = `${color}`; // Assign color to value attribute
                    document.querySelector("#colors").appendChild(option); // add option child of color select element
                }
                // J'ai essayé ainsi mais fonctionne po ! 
                // console.log(product.colors);
                // let content = product.colors.map(product => product.generateColorDom());
                // document.querySelector("#colors").insertAdjacentHTML("beforeend", content.join(""));
                console.log(product);
                // Event Listener on "Ajouter au panier" Button
                document.querySelector("#addToCart").addEventListener("click", function () {
                    if (document.querySelector("#colors").value == "" || document.querySelector("#quantity").value <= 0 || document.querySelector("#quantity").value > 100) {
                        let warning = document.createElement("p");
                        warning.innerHTML = "Merci d'indiquer une couleur et une quantité comprise entre 1 et 100";
                        document.querySelector(".item__content__settings").appendChild(warning);
                        setTimeout(function () {
                            warning.remove()
                        }, 3000);
                    } else {
                        product.quantity = parseInt(document.querySelector("#quantity").value);
                        product.color = document.querySelector("#colors").value;
                        cart.add(product);
                    }
                });
            })
            .catch((error) => {
                console.log(`ERREUR : ${error}`);
            })
    })



