class Product {
    constructor(JsonProduct) {
        Object.assign(this, JsonProduct)
    }

    generateListDom() {
        return `<a href="./product.html?id=${this._id}">
                                  <article>
                                 <img src="${this.imageUrl}" alt="${this.altTxt}">
                                  <h3 class="productName">${this.name}</h3>
                                 <p class="productDescription">${this.description}</p>
                                 </article>
                             </a>`
    }
}