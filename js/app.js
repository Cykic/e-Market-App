import { Cart } from "./cart.js";
import { warning } from "./helper.js";
import { addedAlert } from "./helper.js";
import { Payment } from "./payment.js";

const checkout = document.querySelector(".checkout-btn");
const cartButton = document.querySelector("#cart");
const cartview = document.querySelector("#cart-view");
const mainView = document.querySelector(".main");

// click to show cart
cartButton.addEventListener("click", function (e) {
  e.preventDefault();
  let id = e.target.id;
  document.title = id;
  window.history.pushState({ id }, `${id}`, `/${id}`);
  mainView.classList.add("hide");
  cartview.classList.remove("hide");
});

// cart
export const cart = new Cart();
async function initcart() {
  window.addEventListener("popstate", (event) => {
    mainView.classList.remove("hide");
    cartview.classList.add("hide");
  });
  // HIDE CART VIEW
  cartview.classList.add("hide");
  //
  cart.retrievefromLocalStorage();
  cart._updateCart();

  // CHECKOUT BUTTON
  checkout.addEventListener("click", function () {
    if (cart.totalAmt === 0) {
      warning("Add Item to Cart to checkout");
      checkout.classList.add("disabled");
      return;
    }
    checkout.classList.remove("disabled");
    new Payment().makePayment(cart.totalAmt);
  });
}

initcart();

export function getAddToCartButtons() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        console.log("DOM changed");

        const addToCarts = document.querySelectorAll(".add-to-cart");
        addToCarts.forEach((button) => {
          button.addEventListener("click", click);
        });
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

const click = (e) => {
  cart.addtoCart(`${e.target.dataset.id}`);
  addedAlert()
  
};

// testButton.addEventListener("click", async function () {
//   // await cart.getAllProducts();
//   cart.addtoCart(`${testButton.dataset.id}`);

// });
