class Cart {
    /**
     * Build a Cart from LocalStorage with deserialization
     */
    constructor() {
        let cart = localStorage.getItem("cart");
        if (cart == null) {
            this.cart = [];
        } else {
            this.cart = JSON.parse(cart);
        }
    }

    /**
     * Save the cart with serialization
     */
    save() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    /**
     * Add a product to cart or increase quantity + save cart in LocalStorage
     * @param {Product} product to add
     */
    add(product) {
        let foundProduct = this.cart.find(p => p._id == product._id && p.color == product.color)
        if (foundProduct != undefined) {
            foundProduct.quantity += product.quantity;
        } else {
            product.price = undefined;
            product.colors = undefined;
            this.cart.push(new Product(product));
        }
        this.save();
    }

    /**
     * Remove a product from cart + save cart in LocalStorage
     * @param {Product} product to remove
     */
    remove(product) {
        this.cart = this.cart.filter(p => p._id != product._id || p.color != product.color);
        this.save();
    }

    /**
     * change quantity if product found in Cart or remove it from Cart + save cart
     * @param {Product} product to change quantity
     * @param {number} quantity to change
     */
    changeQuantity(product, quantity) {
        let foundProduct = this.cart.find(p => p._id == product._id && p.color == product.color);
        if (foundProduct != undefined) {
            foundProduct.quantity += parseFloat(quantity);
            if (foundProduct.quantity <= 0 || quantity == null) {
                this.remove(foundProduct);
            } else {
                this.save();
            }
        }
    }

    /**
     * Get all cart products quantity
     * @returns {int} Product number in cart
     */
    getNumberProduct() { // method calculer la qté
        let number = 0; // on défini une variable = 0
        for (let product of this.cart) {
            number += product.quantity;
        }
        return number;
    }

    /**
     * Get total price of the entire cart
     * @returns {int} Price
     */
    getTotalPrice() {

        let total = 0;
        for (let product of this.cart) {
            total += product.quantity * product.price;
        }
        return total;
    }
}








