ApiManager.init()
    .then(() => {
        ApiManager.getAllProducts()
            .then(listProduct => {
                let content = listProduct.map(product => product.generateCardDom());
                document.querySelector("#items").insertAdjacentHTML('beforeend', content.join(""));
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
