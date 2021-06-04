import abstractView from "./abstractView.js"

class CartView extends abstractView{

    parentEl=document.querySelector('.main')

    getHtml(){
        return `
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="css/cart.css" />
          <script type="module" defer src="/js/app.js"></script>
          <script defer src="https://checkout.flutterwave.com/v3.js"></script>
      
          <title>Document</title>
        </head>
      <body>
      <button id="test" data-id="60b4f6f53bdc021804b33d0c"> Add to cart</button>
      <button id="test" data-id="60b4f6f53bdc021804b33d0e"> Add to cart</button>
          <p id="cart-count">Your Cart: 0 Item</p> 
          <div class="cart-container hide">
            <div class="body-flex">
              <!-- PRODUCT -->
            <div class="prd">
              <div class="prd-container">
                <div class="new-tag">New</div>
                <img class="prd-img" src="1.jpg" alt="" />
                <div class="row1">
                  <p class="prd-title">Pure Cotton Multi Design</p>
                  <p class="prd-subtitle">Size: L</p>
                  <p class="prd-price">₦ 12,500</p>
                  <p class="prd-discount">₦ 14,500</p>
                </div>
            </div>
          
          
            <!-- quantity -->
            <div class="prd-qty-container">
              <p class="prd-quantity">Qty:</p>
              <select name="" id="qty">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
             <div class="prd-footer">
              <p class="prd-remove">Remove</p>
              
             </div>
            </div>
          </div>
      
          </div>
        </div>
       
      
        <!-- END PRODUCT -->
      <!-- checkout container --><div class="sk-chase hide">
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
        </div>
      
          <div class="checkout-container">
            <!-- subtotal -->
            <div class="flex-container">
              <p>Subtotal<span class="subtotal-count">(0 item)</span></p>
              <p id="sub-total">₦0</p>
            </div>
            <!-- Delivery -->
            <div class="flex-container">
              <p>Delivery</p>
              <p id="delivery">₦0</p>
            </div>
            <!-- total -->
            <hr>
            <div class="flex-container">
              <p>Est.total</p>
              <p id="total-amount" class="bold">₦0</p>
            </div>
            <!-- checkout -->
            <button class="checkout-btn">Checkout(0)</span></button>
          </div>
        </div>
        <!-- WARNING -->
         <div class="warning hide">Add Item to Cart to Checkout</div>
      </body>
      </html>
      
        `
        }

}

export default new CartView()
