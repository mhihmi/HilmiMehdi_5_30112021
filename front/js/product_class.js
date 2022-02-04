/**
 * Représentation du format d'un produit
 */

class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
        // Assigne toutes les prop récupérées au format Json à ma class Product
        // Sinon il faudrait utiliser par ex. : 
        // this.id = jsonProduct.id
    }
}