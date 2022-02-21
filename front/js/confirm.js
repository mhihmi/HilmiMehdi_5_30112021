localStorage.clear();

const usp = new URLSearchParams(window.location.search);
const productID = usp.get("id");

document.querySelector("#orderId").innerHTML = `${productID}`;