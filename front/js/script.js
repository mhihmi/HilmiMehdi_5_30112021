/**
 * @file script.js is for homepage : to display product list from API
 * @author Medivix
 * @see <a href="https://github.com/mhihmi/HilmiMehdi_5_30112021" rel="noopener noreferrer" target="_blank"> Repo Git </a>
 */

ApiManager.init()
    .then(() => {
        ApiManager.getAllProducts()
            .then(listProduct => {
                let content = listProduct.map(product => product.generateCardDom());
                document.querySelector("#items").insertAdjacentHTML('beforeend', content.join(""));
            })
            .catch((error) => {
                console.log(`ERREUR : ${error}`);
            })
    })

let cart = new Cart();

function badgeDisplay() {
    if (cart == null || cart.cart == 0) {
        document.querySelector("#numberInCart").classList.remove('displayBadge')
    } else {
        document.querySelector("#numberInCart").classList.add('displayBadge')
        document.querySelector("#numberInCart").value = cart.getNumberProduct()
    }
}
badgeDisplay();
