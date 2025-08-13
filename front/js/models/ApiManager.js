/**
 * @file ApiManager.js is a Model for all pages sending request to the API
 * @author Medivix
 * @see <a href="https://github.com/mhihmi/HilmiMehdi_5_30112021" rel="noopener noreferrer" target="_blank"> Repo Git </a>
 */

/** Class to Manage API Calls. 
 * @hideconstructor
*/
class ApiManager {
    static listProduct = null;

    /**
     * Load configuration for Api Call
     * @async
     */
    static async init() {
        this.config = await loadConfig();
    }

    /**
     * Call Api to retrieve all products
     * @returns {Array.<Object>} Array of Product Objects
     */
    static async getAllProducts() {
        if (this.listProduct == null) {
            let data = await fetch(this.config.host + "/products");
            let listProduct = await data.json();
            this.listProduct = listProduct.map(product => new Product(product));
        }
        return this.listProduct;
    }

    /**
     * Call Api to retrieve a Product by his Id and create an objet of it
     * @param {String} id product id to retrieve
     * @returns {Object} 
     */
    static async getProductById(id) {
        let data = await fetch(this.config.host + `/products/${id}`);
        let product = await data.json();
        return new Product(product);
    }

    /**
     * To find a Product by id
     * @param {String} id product id to find
     * @returns {Object} Object with all product keys
     */
    static findProductById(id) {
        return this.listProduct.find(product => product._id == id);
    }

    /**
    * To find a Product Price by id
    * @param {String} id product id's price to find
    * @returns {Int} Price Number of the product Id
    */
    static findProductPriceById(id) {
        let selectedId = this.listProduct.find(product => product._id == id);
        return selectedId.price;
    }

    /**
   * Call Api to post an order
   * @param {Object} Object with method, headers and body
   * @returns {String} Order ID 
   */
    static async postOrder(options) {
        let data = await fetch(this.config.host + `/products/order`, options);
        let OrderId = await data.json();
        return OrderId.orderId;
    }
}