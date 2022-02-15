class Cart {
    constructor() { // plus besoin de fonction getCart avec le constructeur
        let cart = localStorage.getItem("cart");
        if (cart == null) { // par défaut getItem retourne un null
            this.cart = []; // Si le panier n'existe pas encore on l'ajoute à la prop du cart sous forme de array
        } else {
            this.cart = JSON.parse(cart); // sinon on récupère le panier existant désérialisé (chaîne de caractère => objet)
        }
    }

    save() { // method pour créer un panier, plus besoin de cart en param ! On peut la rename vu qu'on fera cart.save
        localStorage.setItem("cart", JSON.stringify(this.cart)); // On associe la prop dans la class cart à la clé "cart" et on l'enregistre après l'avoir sérialisé (objet => chaîne de caractères)
    }

    add(product) { // method pour ajouter au panier. On peut la rename vu qu'on fera cart.add
        // let cart = getCart(); // plus besoin, on utilise le panier du constructeur ! ;)
        let foundProduct = this.cart.find(p => p._id == product._id && p.color == product.color) // on cherche dans le panier si il y a un produit dont l'id et color est identique au produit qu'on veut ajouter (ft find avec la condition p, si il trouve pas d'élément, retourne undefined) 
        if (foundProduct != undefined) { // si on trouve un produit identique 
            foundProduct.quantity += product.quantity; // on y ajoute la valeur de l'input
        } else {
            // product.quantity = product.quantity; // sinon on le défini à la quantité indiquée dans l'input !
            product.price = undefined;
            product.colors = undefined;
            this.cart.push(new Product(product)); // on considère cart comme un tableau => on y ajoute un produit
        }
        this.save(); // on enregistre le nouveau panier, plus besoin du param / procédural
    }

    remove(product) { // method pour retirer du panier. On peut la rename vu qu'on fera cart.remove
        // let cart = getCart(); // plus besoin, on utilise le panier du constructeur ! ;)
        this.cart = this.cart.filter(p => p._id != product._id || p.color != product.color); // Un des moyens les plus simples et efficaces de retirer un élément. filter est comme find : travaille sur un array par rapport à une condition qu'on peut inverser. Ici on garde les éléments différents du produit renseigné. Avec un "==" on aurai conservé seulement le produit renseigné.
        this.save(); // on enregistre le nouveau panier
    }

    changeQuantity(product, quantity) { // method changer la qté de produits
        // let cart = getCart(); // plus besoin, on utilise le panier du constructeur ! ;)
        let foundProduct = this.cart.find(p => p._id == product._id && p.color == product.color); // on cherche dans le panier si il y a un produit dont l'id est identique au produit dont on veut changer la quantité
        if (foundProduct != undefined) { // si on trouve un produit identique 
            foundProduct.quantity += parseFloat(quantity); // On ajoute la qté souhaitée à la qté existante 
            if (foundProduct.quantity <= 0 || quantity == null) { // si la quantité est <= 0
                this.remove(foundProduct); // on le retire du panier et on enregistre le panier (cf ft remove)
            } else {
                this.save(); // Sinon On enregistre le nouveau panier
            }
        }
    }

    getNumberProduct() { // method calculer la qté
        // let cart = getCart(); // plus besoin, on utilise le panier du constructeur ! ;)
        let number = 0; // on défini une variable = 0
        for (let product of this.cart) { // on parcours les produits du panier
            number += product.quantity; // on ajoute les qtés de chaque produit à la variable number
        }
        return number; // on retourne cette variable !
    }

    getTotalPrice() { // method calculer le prix total
        // let cart = getCart(); // plus besoin, on utilise le panier du constructeur ! ;)
        let total = 0; // on défini une variable = 0
        for (let product of this.cart) { // on parcours les produits du panier
            total += product.quantity * product.price; // on ajoute à la var total le produit qté*prix de chaque produit
        }
        return total; // on retourne cette variable !
    }
}








