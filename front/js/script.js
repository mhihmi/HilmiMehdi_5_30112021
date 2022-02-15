ApiManager.init()
    .then(() => {
        ApiManager.getAllProducts()
            .then(listProduct => {
                let content = listProduct.map(product => product.generateCardDom());
                document.querySelector("#items").insertAdjacentHTML('beforeend', content.join(""));
            })
    })

// ApiManager.getProductById()