import loginView from '../views/loginView.js'
import registerView from '../views/registerView.js'
import * as model from './model.js'
import category1View from '../views/category1View.js'
import category2View from '../views/category2View.js'
import categoryView from '../views/categoryView.js'
import currentCategoryView from '../views/currentCategoryView.js'
import singleProductView from '../views/singleProductView.js'
import abstractView from '../views/abstractView.js'
import cartView from '../views/cartView.js'

const abstract= new abstractView()
function push(event, view){
  let id= event.target.id; 
  if(!view) return
  view.showViews()
   document.title=id 
   window.history.pushState({id}, `${id}`, `/${id}`)
}

window.onload = event=>{
    window['registerView'].addEventListener('click', event=> push(event, registerView))
    window['loginView'].addEventListener('click', event=> push(event, loginView))
    window['cartView'].addEventListener('click', event=> push(event, cartView))
   
}
window.addEventListener('popstate', event=> {
   push(event, abstract.defaultView())

})

loginView.getInputValues()
registerView.registerRedirect()
loginView.loginRedirect()
loginView.removeLogin()
category1View.renderSpinner()
async function registerHandler(){
    try{
        registerView.getInputValues()
        registerView.removeRegistration()
    }
    catch(err){
        registerView.renderError(err)
    }
}
registerHandler()

async function controlCategoriesView(){
    try{  
      await model.getProducts()
      await model.getCategories()
        category1View.showViews(model.state.category1)
        category1View.seeMoreHandler(model.state.category1All)
        category2View.seeMoreHandler2(model.state.category2All)
        category2View.showViews(model.state.category2)
    }
    catch(err){
        console.log(err);
        
    }
}  
async function controlCategories(){
   
     try{
await model.getCategories()
categoryView.showViews(model.state.categories)
 }
 catch(err){
     console.log(err);
     categoryView.renderProductsError(err)
 }
}


async function controlDisplayCategories(categoryName){
    if(!categoryName) return;
    model.displayCategories(categoryName)
    currentCategoryView.showViews(model.state.currentCategory)
}
async function controlSingleProducts(){
    const id = window.location.hash.slice(1)
    if(!id) return;
  await  model.getSingleProduct(id)
    singleProductView.showViews(model.state.singleProduct)
}
categoryView.curCategoryViewHandler(controlDisplayCategories)

 window.addEventListener('load', controlCategoriesView)
 
 window.addEventListener('load', controlCategories)

 window.addEventListener('hashchange', controlSingleProducts)

