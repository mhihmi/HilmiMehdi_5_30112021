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
            let content = "";
            for (let product of jsonListProduct) {
                // console.log(product); 
                content += `<a href="./product.html?id=${product._id}">
                                  <article>
                                 <img src="${product.imageUrl}" alt="${product.altTxt}">
                                  <h3 class="productName">${product.name}</h3>
                                 <p class="productDescription">${product.description}</p>
                                 </article>
                             </a>`;
            };
            document.querySelector("#items").insertAdjacentHTML('beforeend', content); // Possible de faire avec append() ?
            // Ainsi, le code sans innerHTML, insertAdjacentHTML()est sans aucun doute plus sécurisé, mais il n'est pas sensiblement plus rapide et il pourrait être légèrement plus verbeux. Dans l'ensemble, et uniquement pour des raisons de sécurité, il semble préférable d'utiliser les méthodes avec des arguments de nœud, en particulier les méthodes de commodité append(), prepend()et replaceChildren().
            // https://medium.com/codex/what-is-faster-to-insert-into-dom-html-or-dom-nodes-ff11586f8570
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