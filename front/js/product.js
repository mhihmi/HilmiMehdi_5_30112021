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
                        product.price = undefined;
                        product.colors = undefined;
                        cart.add(product);
                    }
                });
            })
            .catch((error) => {
                console.log(`ERREUR : ${error}`);
            })
    })

// // Requête GET sur l'api & Injection des caractéristiques du produit sélectionné à l'accueil
// loadConfig().then(data => {
//     config = data;
//     fetch(config.host + `/api/products/${productID}`) //  || fetch(`http://localhost:3000/api/products/${productID}`)
//         .then(data => data.json()) // Ici on récupère des données brutes au format texte pour les transformer en objet de données au format json
//         .then(jsonProduct => { // ici on récupère le produit de l'url en question au format data.json
//             // console.log(jsonProduct); // On vérifie si le fetch a fonctionné
//             //Place aux injections de contenu :

//             // On créé un produit à envoyer au LocalStorage/panier en lui assignant les choix de l'utilisateur
//             function createProduct() {
//                 let quantity = document.querySelector("#quantity");
//                 let colorChoice = document.querySelector("#colors");

//                 let product = {
//                     id: `${productID}`,
//                     name: `${jsonProduct.name}`,
//                     image: `${jsonProduct.imageUrl}`,
//                     altTxt: `${jsonProduct.altTxt}`,
//                     color: `${colorChoice.value}`,
//                     quantity: `${quantity.value}`,
//                 };

//                 if (document.querySelector("#colors").value == "" || document.querySelector("#quantity").value <= 0 || document.querySelector("#quantity").value > 100) {
//                     let warning = document.createElement("p");
//                     warning.innerHTML = "Merci d'indiquer une couleur et une quantité comprise entre 1 et 100";
//                     document.querySelector(".item__content__settings").appendChild(warning);
//                     setTimeout(function () {
//                         warning.remove()
//                     }, 3000);
//                 } else {
//                     product.quantity = document.querySelector("#quantity").value;
//                     product.color = document.querySelector("#colors").value;
//                     cart.add(product);
//                 }
//             }

//             // Event Listener on "Ajouter au panier" Button
//             document.querySelector("#addToCart").addEventListener("click", createProduct);

//         })
//         .catch((error) => {
//             console.log(`ERREUR : ${error}`);
//         });
// })

