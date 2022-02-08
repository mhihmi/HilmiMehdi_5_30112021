// Créons un panier au chargement de la page (cf class dans cartfunctions.js)
let cart = new Cart();

// Récupération de l'id dans l'URL + création de l'objet productID
const usp = new URLSearchParams(window.location.search);
const productID = usp.get("id");

// Requête GET sur l'api & Injection des caractéristiques du produit sélectionné à l'accueil
loadConfig().then(data => {
    config = data;
    fetch(config.host + `/api/products/${productID}`) //  || fetch(`http://localhost:3000/api/products/${productID}`)
        .then(data => data.json()) // Ici on récupère des données brutes au format texte pour les transformer en objet de données au format json
        .then(jsonProduct => { // ici on récupère le produit de l'url en question au format data.json
            console.log(jsonProduct); // On vérifie si le fetch a fonctionné
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
        })
        .catch((error) => {
            console.log(`ERREUR : ${error}`);
        });
})