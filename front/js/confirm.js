/**
 * @file confirm.js is for confirmation page : to display orderId for users getting it from URL
 * @author Medivix
 * @see <a href="https://github.com/mhihmi/HilmiMehdi_5_30112021" rel="noopener noreferrer" target="_blank"> Repo Git </a>
 */

localStorage.clear();

const usp = new URLSearchParams(window.location.search);
const productID = usp.get("id");

document.querySelector("#orderId").innerHTML = `${productID}`;