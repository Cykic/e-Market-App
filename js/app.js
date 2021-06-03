import { Cart } from "./cart.js";
import { warning } from "./helper.js";
import { Payment } from "./payment.js";

const testButtons = document.querySelectorAll("#test");
const checkout = document.querySelector(".checkout-btn");

// cart
export const cart = new Cart();
async function initcart() {
  cart.retrievefromLocalStorage()
  cart._updateCart()

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

testButtons.forEach(button =>{
  button.addEventListener('click',function(){
    cart.addtoCart(`${button.dataset.id}`)
  })
})

// testButton.addEventListener("click", async function () {
//   // await cart.getAllProducts();
//   cart.addtoCart(`${testButton.dataset.id}`);
  
// });
