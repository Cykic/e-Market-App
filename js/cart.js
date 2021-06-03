import { spinner } from "./helper.js";

export class Cart {
  cart = [];
  products = [];
  constructor() {}
  cartContainer = document.querySelector(".cart-container");
  totalLabel = document.querySelector("#total-amount");
  subTotalLabel = document.querySelector("#sub-total");
  deliveryLabel = document.querySelector("#delivery");
  deliveryLabel = document.querySelector("#delivery");
  cartCount = document.querySelector("#cart-count");
  checkoutbtn = document.querySelector(".checkout-btn");
  subTotalCount = document.querySelector(".subtotal-count");

  conversionRate = 410.93;
  totalAmt;

  async getAllProducts() {
    try {
      // Hit API Endpoint
      spinner(true);
      const res = await fetch(
        "https://shopappanter.herokuapp.com/api/products"
      );
      spinner(false);
      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      this.products = data.products;
      this.products.forEach((prd) => (prd["quantity"] = 1));
      console.log(data);
      console.log(this.products);

      // Create new Product Object

      // Add project object to array
    } catch (error) {
      console.log("An Error is", error);
    }
  }

  addtoCart(productid) {
    // find product Object by id
    const foundItem = this.findProduct(productid);
    // ADD to cart
    this.cart.push(foundItem);
    console.log(this.cart);
  }

  removefromCart(productid) {
    const foundItem = this.findProduct(productid);
    console.log(foundItem);
    const productIndex = this.cart.findIndex((prd) => prd === foundItem);
    this.cart.splice(productIndex, 1);
    console.log(this.cart);
  }

  total() {
    let delivery = 3;
    const subTotal = this.cart.reduce((sum, prd) => sum + prd.price, 0);
    if (subTotal === 0) delivery = 0;
    const totalAmount = subTotal + delivery;
    this.totalLabel.textContent = `${this._numberFormat(totalAmount)}`;
    this.deliveryLabel.textContent = `${this._numberFormat(delivery)}`;
    this.subTotalLabel.textContent = `${this._numberFormat(subTotal)}`;
    this.totalAmt = Math.floor(totalAmount * this.conversionRate);
    return totalAmount;
  }

  findProduct(id) {
    return this.products.find((prd) => prd["_id"] === id);
  }

  _updateCart() {
    this._clear();
    this.cart.forEach((item) => {
      const html = `
      <div class="body-flex">
        <!-- PRODUCT -->
      <div class="prd" >
        <div class="prd-container">
          <div class="new-tag">New</div>
          <img class="prd-img" src="${item.image}" alt="" />
          <div class="row1">
            <p class="prd-title">${item.name}</p>
            <p class="prd-subtitle">Size: L</p>
            <p class="prd-price">${this._numberFormat(item.price)}</p>
            <p class="prd-discount">${this._numberFormat(item.price + 20)}</p>
          </div>
      </div>
    
    
      <!-- quantity -->
      <div class="prd-qty-container">
      <span>-</span>
      <p class="prd-quantity">Quantity:${item.quantity}</p>
      <div class="plus">+</div>
        
        <div class="prd-footer">
        <p class="prd-remove" data-id = ${item["_id"]}>Remove</p>
        </div>
      </div>
      
      `;

      this.cartContainer.insertAdjacentHTML("afterbegin", html);
      this.cartContainer.classList.remove("hide");
    });

    const prdRemoveBtn = document.querySelectorAll(".prd-remove");
    if (!prdRemoveBtn) return;
    prdRemoveBtn.forEach((btn) => {
      btn.addEventListener("click", this.removeHandler.bind(this, btn));
    });
    this.total();
    console.log(this.totalAmt);
    this._labelChanges();

    // LOCAL STORAGE
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  _clear() {
    this.cartContainer.innerHTML = "";
  }

  removeHandler(btn) {
    this.removefromCart(btn.dataset.id);
    this._updateCart();
  }

  _clearCart() {
    this.cart.splice(0, this.cart.length);
    this._updateCart();
  }

  _numberFormat(number) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(Math.floor(number * this.conversionRate));
  }

  _labelChanges() {
    this.cartCount.textContent = `Your Cart: ${this.cart.length} Item (s)`;
    this.checkoutbtn.textContent = `Checkout (${this.cart.length})`;
    this.subTotalCount.textContent = `(${this.cart.length} ${
      this.cart.length > 1 ? "Items" : "Item"
    })`;
  }

  quantity() {}
}
