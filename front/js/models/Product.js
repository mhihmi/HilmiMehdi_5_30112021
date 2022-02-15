class Product {
    /**
     * Build an object from json
     * @param {Object} JsonProduct 
     */
    constructor(JsonProduct) {
        Object.assign(this, JsonProduct);
    }

    /**
     * Generate html card product for Dom
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
     * Generate html image + Alt text
     * @returns {string} html image product
     */
    generateImageDom() {
        return `<img src="${this.imageUrl}" alt="${this.altTxt}">`
    }

    /**
     * Generate color option
     * @returns {string} html option for color
     */
    // generateColorDom() {
    //     return `<option value="${this.color}">${this.color}</option>`
    // }

}