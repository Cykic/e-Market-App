import abstractView from "./abstractView.js";

class singleProductView extends abstractView{ 
  parentEl= document.querySelector('.singleProductView') 
 
  getHtml(){
    this.hideElement()
    this.showElement()
    return `
     <div class="about-product">
     <div class="about-product__img-side">
         <img src="../img/top-1.jfif" alt="" class="imgs">
     </div>

     <div class="about-product__discription">
         <div class="about-product__discription__official">
             Rexha Official Store
         </div>
         <div class="about-product__discription__product">
             <p class="product-name">
                ${this._data.name}
             </p>
             <p class="product-brand">
                 <span class="brand__title">
                     Brand:
                 </span> ${this._data.brand}
             </p>
             <p class="product-price">
                 <b>${singleProduct.calculatePrice(this._data.price)}</b>
             </p>
             <p class="shiping">
                 ${this._data.description}
             </p>
             <div class="about-product__discription__product__rating">
                ${singleProduct.starRating(this._data.rating)}
             </div>
         </div>
     </div>

     <div class="about-product__add">
         <button class="about-product__add__btn">
             <i class="fa fa-shopping-cart"></i> Add To Cart
          </button>
     </div>
         
     </div>
 </div> `
    }
   

}

export default new singleProductView()
const singleProduct= new singleProductView()