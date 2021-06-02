import loginView from '../views/loginView.js'
import registerView from '../views/registerView.js'
import * as model from './model.js'
import category1View from '../views/category1View.js'
import category2View from '../views/category2View.js'
import categoryView from '../views/categoryView.js'
import currentCategoryView from '../views/currentCategoryView.js'
import singleProductView from '../views/singleProductView.js'

//Router logic
function loadContent(id){
    
console.log('loading content for register'); 
}
function push(event, view){
   let id= event.target.id;
   // view= event.target.dataset.view
    view.showViews()
   document.title=id
   
   loadContent(id, view)
   window.history.pushState({id}, `${id}`, `/page/${id}`)
}
window.onload = (event)=>{
    window['registerView'].addEventListener('click', event=> push(event, registerView))
}
// window.addEventListener('popstate', event=> {
//     let stateId= event.state.id;
   
//     loadContent(stateId)
// })





loginView.getInputValues()
loginView.loginHandler()
//registerView.registrationHandler()
registerView.registerRedirect()
loginView.loginRedirect()
loginView.removeLogin()
categoryView.renderSpinner()
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


async function controlCategories(){
   
     try{
await model.getCategories()
categoryView.showViews(model.state.categories)
 }
 catch(err){
     console.log(err);
 }
}

async function controlCategoriesView(){
    try{
        
        await model.getProducts()
        category1View.showViews(model.state.category1)
        category2View.showViews(model.state.category2)
    }
    catch(err){
        console.log(err);
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


async function controlSingleProduct(){
    try{
        const id = window.location.hash.slice(1) 
      if(!id) return
       await model.getSingleProduct(id)
    }
    catch(err){
        console.log(err);
    }
}

 window.addEventListener('load', controlCategories)
 window.addEventListener('load', controlCategoriesView)

 window.addEventListener('hashchange', controlSingleProduct)
// window.addEventListener('hashchange', controlSingleProduct)
