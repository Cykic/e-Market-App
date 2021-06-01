import { Cart } from "./cart.js";
import { warning } from "./helper.js";
import { Payment } from "./payment.js";

const testButton = document.querySelector("#test");
const checkout = document.querySelector(".checkout-btn");

// cart
export const cart = new Cart();
async function initcart() {
  await cart.getAllProducts();
  cart.addtoCart("60b4f6f53bdc021804b33d0a");
  cart.addtoCart("60b4f6f53bdc021804b33d0c");
  cart.addtoCart("60b4f6f53bdc021804b33d0d");
  cart.addtoCart("60b4f6f53bdc021804b33d0b");
  cart._updateCart();

  // CHECKOUT BUTTON
  checkout.addEventListener("click", function () {
    if(cart.totalAmt === 0){
      warning("Add Item to Cart to checkout")
      checkout.classList.add('disabled')
      return
    }
    checkout.classList.remove('disabled')
    new Payment().makePayment(cart.totalAmt);
  });
}

initcart();

// testButton.addEventListener("click", function () {});
