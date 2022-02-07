/**
 * Les fonctions du panier
 */

// class Product {
//     constructor(jsonProduct) {
//         jsonProduct && Object.assign(this, jsonProduct);
//         // Assigne toutes les prop récupérées au format Json à ma class Product
//         // Sinon il faudrait utiliser par ex. :
//         // this.id = jsonProduct.id
//     }
// }

function saveCart(cart) { // fonction pour créer un panier
    localStorage.setItem("cart", JSON.stringify(cart)); // On associe la variable cart à la clé "cart" et on l'enregistre après l'avoir sérialisé (objet => chaîne de caractères)
}

function getCart() { // ft pour récupérer le panier
    let cart = localStorage.getItem("cart");
    if (cart == null) { // par défaut getItem retourne un null
        return []; // Si le panier n'existe pas encore on retourne un array vide
    } else {
        return JSON.parse(cart); // sinon on récupère le panier existant désérialisé (chaîne de caractère => objet)
    }
}

function addCart(product) { // ft pour ajouter au panier
    let cart = getCart(); // on récupère le panier déjà existant
    let foundProduct = cart.find(p => p.id == product.id) // on cherche dans le panier si il y a un produit dont l'id est identique au produit qu'on veut ajouter (ft find avec la condition p, si il trouve pas d'élément, retourne undefined) 
    if (foundProduct != undefined) { // si on trouve un produit identique 
        foundProduct.quantity++; // on incrémente
    } else {
        product.quantity = 1; // sinon on le défini à 1 !
        cart.push(product); // on considère cart comme un tableau => on y ajoute un produit
    }
    saveCart(cart); // on enregistre le nouveau panier
}

function removeFromCart(product) { // ft pour retirer du panier
    let cart = getCart(); // on récupère notre panier
    cart = cart.filter(p => p.id != product.id); // Une des moyens les plus simples et efficaces de retirer un élément. filter est comme find : travaille sur un array par rapport à une condition qu'on peut inverser. Ici on garde les éléments différents du produit renseigné. Avec un "==" on aurai conservé seulement le produit renseigné.
    saveCart(cart); // on enregistre le nouveau panier
}

function changeQuantity(product, quantity) { // ft changer la qté de produits
    let cart = getCart(); // on récupère le panier déjà existant
    let foundProduct = cart.find(p => p.id == product.id); // on cherche dans le panier si il y a un produit dont l'id est identique au produit dont on veut changer la quantité
    if (foundProduct != undefined) { // si on trouve un produit identique 
        foundProduct.quantity += quantity; // On ajoute à la qté existante la qté souhaitée
        if (foundProduct.quantity <= 0) { // si la quantité est <= 0
            removeFromCart(foundProduct); // on le retire du panier et on enregistre le panier (cf ft remove)
        } else {
            saveCart(cart); // Sinon On enregistre le nouveau panier
        }
    }
}

function getNumberProduct() { // ft calculer la qté
    let cart = getCart(); // on récupère le panier déjà existant
    let number = 0; // on défini une variable = 0
    for (let product of cart) { // on parcours les produits du panier
        number += product.quantity; // on ajoute les qtés de chaque produit à la variable number
    }
    return number; // on retourne cette variable !
}

function getTotalPrice() { // ft calculer le prix total
    let cart = getCart(); // on récupère le panier déjà existant
    let total = 0; // on défini une variable = 0
    for (let product of cart) { // on parcours les produits du panier
        total += product.quantity * product.price; // on ajoute à la var total le produit qté*prix de chaque produit
    }
    return total; // on retourne cette variable !
}