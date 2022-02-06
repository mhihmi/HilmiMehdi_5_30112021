/**
 * Gère l'affichage et les interactions de la page d'accueil
 */

// Requête GET sur l'api & Injection des produits dans le DOM
loadConfig().then(data => {
    config = data;
    fetch(config.host + "/api/products") // <==>  fetch("http://localhost:3000/api/products/")
        .then(data => data.json()) // Ici on récupère des données brutes au format texte pour les transformer en objet de données au format json
        .then(jsonListProduct => { // ici on récupère la liste de produits au format data.json
            // console.log(jsonListProduct); // On vérifie si le fetch a fonctionné
            for (let product of jsonListProduct) {
                // console.log(product); 
                document.querySelector("#items").innerHTML += `<a href="./product.html?id=${product._id}">
                                                                          <article>
                                                                         <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                          <h3 class="productName">${product.name}</h3>
                                                                         <p class="productDescription">${product.description}</p>
                                                                         </article>
                                                                     </a>`;
            }
        })
        .catch((error) => {
            console.log(`ERREUR : ${error}`);
        });
})

// FOR....OF ou EACH (pour les arrays) MAIS PAS FOR...IN (pour les objects)
// loadConfig().then(data => {
//     config = data;
//     fetch(config.host + "/api/products").then(data => data.json())
//         .then(jsonListProduct => {
//             // console.log(jsonListProduct); // On vérifie si le fetch a fonctionné
//             jsonListProduct.forEach((jsonProduct) => {
//                 let product = new Product(jsonProduct); // class dans le fichier product_class.js
//                 document.querySelector("#items").innerHTML += `<a href="./product.html?id=${product._id}">
//                                                                          <article>
//                                                                         <img src="${product.imageUrl}" alt="${product.altTxt}">
//                                                                          <h3 class="productName">${product.name}</h3>
//                                                                         <p class="productDescription">${product.description}</p>
//                                                                         </article>
//                                                                     </a>`;
//             });
//         });
// });