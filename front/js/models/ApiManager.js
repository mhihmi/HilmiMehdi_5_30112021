class ApiManager {
    static listProduct = null;

    /**
     * Load configuration for Api Call
     */
    static async init() {
        this.config = await loadConfig();
    }

    /**
     * Call Api to retrieve all products
     * @returns {[Object]} 
     */
    static async getAllProducts() {
        if (this.listProduct == null) {
            let data = await fetch(this.config.host + "/api/products");
            let listProduct = await data.json();
            this.listProduct = listProduct.map(product => new Product(product));
        }
        return this.listProduct;
    }

    /**
     * Call Api to retrieve a Product by his Id
     * @param {String} id product id to retrieve
     * @returns {Object} 
     */
    static async getProductById(id) {
        let data = await fetch(this.config.host + `/api/products/${id}`);
        let product = await data.json();
        return new Product(product);
    }

    /**
     * Method to find a Product by id
     * @param {String} id product id to find
     * @returns {String}
     */
    static findProductById(id) {
        return this.listProduct.find(product => product.id == id);
    }
}