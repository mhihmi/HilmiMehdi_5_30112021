// Créons un panier au chargement de la page (cf class dans cartfunctions.js)
// document.addEventListener('DOMContentLoaded', function () {
let cart = new Cart();
// });

// console.log(cart);

// Récupération de l'id dans l'URL + création de l'objet productID
const usp = new URLSearchParams(window.location.search);
const productID = usp.get("id");

// Requête GET sur l'api & Injection des caractéristiques du produit sélectionné à l'accueil
loadConfig().then(data => {
    config = data;
    fetch(config.host + `/api/products/${productID}`) //  || fetch(`http://localhost:3000/api/products/${productID}`)
        .then(data => data.json()) // Ici on récupère des données brutes au format texte pour les transformer en objet de données au format json
        .then(jsonProduct => { // ici on récupère le produit de l'url en question au format data.json
            // console.log(jsonProduct); // On vérifie si le fetch a fonctionné
            //Place aux injections de contenu :
            document.querySelector(".item__img").innerHTML += `<img src="${jsonProduct.imageUrl}" alt="${jsonProduct.altTxt}">`;
            document.querySelector("#title").textContent += jsonProduct.name;
            document.querySelector("#price").textContent += jsonProduct.price;
            document.querySelector("#description").textContent += jsonProduct.description;

            for (let color of jsonProduct.colors) {  // on parcours le array de colors
                let option = document.createElement("option"); // on créé une balise option pour chaque color
                option.innerHTML = `${color}`; // injection des données contenues dans le arrayJson en html
                option.value = `${color}`; // injection des données du arrayJson dans l'attribut value

                // on inject l'élément créé en tant qu'enfant du select avec l'id colors
                let optionParent = document.querySelector("#colors");
                optionParent.appendChild(option);
            }

            // On créé un produit à envoyer au LocalStorage en lui assignant les choix de l'utilisateur
            function createProduct() {
                let quantity = document.querySelector("#quantity");
                let colorChoice = document.querySelector("#colors");

                let product = {
                    id: `${productID}`,
                    name: `${jsonProduct.name}`,
                    image: `${jsonProduct.imageUrl}`,
                    altTxt: `${jsonProduct.altTxt}`,
                    color: `${colorChoice.value}`,
                    quantity: `${quantity.value}`,
                };

                if (colorChoice.value == "" || quantity.value <= 0 || quantity.value > 100) {
                    let content = document.querySelector(".item__content__settings");
                    let warning = document.createElement("p");
                    warning.innerHTML = "Merci d'indiquer une couleur et une quantité comprise entre 1 et 100";
                    content.appendChild(warning);
                    setTimeout(function () {
                        warning.remove()
                    }, 3000);
                } else {
                    cart.add(product);
                }
            }

            // Event Listener sur le bouton "Ajouter au panier"
            const btn = document.querySelector("#addToCart");
            btn.addEventListener("click", createProduct);

        })
        .catch((error) => {
            console.log(`ERREUR : ${error}`);
        });
})

