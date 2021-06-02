import abstractView from "./abstractView.js";

class category2View extends abstractView{   
  parentEl= document.querySelector('.category2Section')
  getHtml(){
    return this._data.map(this.generateMarkupPreview).join('')
    }
    generateMarkupPreview(products){
     return ` 
     
     <div class="section__third__top-sales__container">
     <a href="#${products._id}">
          <div class="section__third__top-sales__container__img">
       <img src="img/top-2.jfif" alt="T-shirt" class="imgs" />
     </div>
     <p class="discription">
       <b>${products.name}</b>
     </p>
     <p class="price">${cate2View.calculatePrice(products.price)}</p>
     <button class="btn add-to-cart">Add To Cart</button>
     </a>
   </div>
     `
        
    }
}
export default new category2View()
const cate2View= new category2View()