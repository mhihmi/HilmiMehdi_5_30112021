class Product {
    /**
     * Build an object from json
     * @param {Object} JsonProduct 
     */
    constructor(JsonProduct) {
        Object.assign(this, JsonProduct);
    }

    /**
     * Generate html card product for HomePageDom
     * @returns {string} html card product
     */
    generateCardDom() {
        return `<a href="./product.html?id=${this._id}">
                                  <article>
                                 <img src="${this.imageUrl}" alt="${this.altTxt}">
                                  <h3 class="productName">${this.name}</h3>
                                 <p class="productDescription">${this.description}</p>
                                 </article>
                             </a>`
    }

    /**
     * Generate html imageTag with Alt text
     * @returns {string} html image product
     */
    generateImageDom() {
        return `<img src="${this.imageUrl}" alt="${this.altTxt}">`
    }

    /**
     * Generate color option
     * @returns {string} html option for color
     */
    generateColorDom() {
        return `<option value="${this.color}">${this.color}</option>`
    }

    /**
     * Generate Html Cart Items on Cart Page
     * @returns {string} html cart item
     */
    generateCartItem() {
        return `<article class="cart__item" data-id="${this._id}" data-color="${this.color}">
                                                                <div class="cart__item__img">
                                                                <img src="${this.imageUrl}" alt="${this.altTxt}">
                                                                </div>
                                                                <div class="cart__item__content">
                                                                <div class="cart__item__content__description">
                                                                    <h2>${this.name}</h2>
                                                                    <p>${this.color}</p>
                                                                    <p>${this.price} €</p>
                                                                </div>
                                                                <div class="cart__item__content__settings">
                                                                    <div class="cart__item__content__settings__quantity">
                                                                    <p>Qté : ${this.quantity}</p>
                                                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${this.quantity}">
                                                                    </div>
                                                                    <div class="cart__item__content__settings__delete">
                                                                    <p class="deleteItem">Supprimer</p>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </article>`;
    }
}