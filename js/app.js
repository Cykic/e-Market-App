import { Cart } from "./cart.js";
import { Payment } from "./payment.js";

const testButton = document.querySelector("#test");
const checkout = document.querySelector(".checkout-btn");

// cart
async function initcart() {
  const cart = new Cart();
  await cart.getAllProducts();
  cart.addtoCart("60af601029a5c51a0012e176");
  cart.addtoCart("60af601029a5c51a0012e174");
  cart.addtoCart("60af601029a5c51a0012e173");
  cart.addtoCart("60af601029a5c51a0012e172");
  cart._updateCart();

  // CHECKOUT BUTTON
  checkout.addEventListener("click", function () {
    new Payment().makePayment(cart.totalAmt);
  });
}

initcart();

testButton.addEventListener("click", function () {});
