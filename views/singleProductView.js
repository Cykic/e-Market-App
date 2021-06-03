import abstractView from "./abstractView.js";

class singleProductView extends abstractView{ 
  parentEl= document.querySelector('.single-productCategory') 
  parentElContainer= document.querySelector('.section__six ')
  sectionSecond = document.querySelector('.secondSection')
  curparentEl= document.querySelector('.second-productCategory')
  getHtml(){
    this.hideElement()
    this.showElement()
    this.parentEl.classList.remove('hide')
    this.curparentEl.classList.add('hide')
    this.sectionSecond.classList.add('hide')
    return `
    <div class="about-product">
    <div class="about-product__img-side">
        <img src="../img/top-1.jfif" alt="" class="imgs--1">
    </div>

    <div class="about-product__discription">
        <div class="about-product__discription__official">
            Rexha Official Store
        </div>
        <div class="about-product__discription__product">
            <p class="product-name">
               ${this._data.name}
            </p>
            <div class="about-product__discription__product__rating">
               ${singleProduct.starRating(this._data.rating)}
                <span class="numberOfPeopleRated">
                    <span class="number">${this._data.numReviews}</span> Rated
                </span>

            </div>
            <p class="product-brand">
                <span class="brand__title">
                    Brand:
                </span> <span class="brand__name">${this._data.brand}</span>
            </p>

            <p class="product-brand">
                <span class="brand__title">
                    Seller:
                </span> <span class="brand__name">${this._data.seller.seller.name}</span>
            </p>

            <p class="product-brand">
                <span class="brand__title">
                    Category:
                </span> <span class="brand__name">${this._data.category}</span>
            </p>

            <p class="product-price">
                <b>${singleProduct.calculatePrice(this._data.price)}</b>
            </p>
            <p class="shiping">
               ${this._data.description}
            </p>
            
        </div>
    </div>

    <div class="about-product__add">
  
        <button class="about-product__add__btn">
            Add To Cart
         </button>
    </div>
        
    </div>
</div> `
    }
   

}

export default new singleProductView()
const singleProduct= new singleProductView()