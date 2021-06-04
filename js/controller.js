import loginView from '../views/loginView.js'
import registerView from '../views/registerView.js'
import * as model from './model.js'
import category1View from '../views/category1View.js'
import category2View from '../views/category2View.js'
import categoryView from '../views/categoryView.js'
import currentCategoryView from '../views/currentCategoryView.js'
import singleProductView from '../views/singleProductView.js'
import {users} from '../views/loginView.js'
import abstractView from '../views/abstractView.js'
import { getAddToCartButtons } from '../js/app.js'
const abstract= new abstractView()
function push(event, view){
  let id= event.target.id; 
   if(!id)id =''
  document.title=id 
   window.history.pushState({id}, `${id}`, `/${id}`)
  if(!view) return
  view.showViews()
}
window.onload = event=>{
    window['registerView'].addEventListener('click', event=> push(event, registerView))
    window['loginView'].addEventListener('click', event=> push(event, loginView))
   
}

window.onload = (event) => {
  window["registerView"].addEventListener("click", (event) =>
    push(event, registerView)
  );
  window["loginView"].addEventListener("click", (event) =>
    push(event, loginView)
  );
  
};
window.addEventListener("popstate", (event) => {
  push(event, abstract.defaultView());
});

registerView.registerRedirect()
loginView.loginRedirect()

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
loginHandler()


async function loginHandler(){
    try{
        loginView.getInputValues()
        loginView.removeLogin()
    }
  catch(err){
    console.log(err);
    //loginView.renderError(err)
  }
}

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
        categoryView.renderProductsError('No internet connection detected. check your network connection or reload the page')
        
    }
} 
registerHandler();
async function getUsers(){
  const getJSON= await fetch('https://shopappanter.herokuapp.com/api/users')
  const data= await getJSON.json()
  console.log(data);
}
 getUsers()

async function controlCategories() {
  try {
    await model.getCategories();
    categoryView.showViews(model.state.categories);
    } catch (err) {
    console.log(err);
    categoryView.renderProductsError('No internet connection');
  }
}

async function controlDisplayCategories(categoryName) {
  if (!categoryName) return;
  model.displayCategories(categoryName);
  currentCategoryView.showViews(model.state.currentCategory);
  
}

async function controlSingleProducts(id) {
  
  await model.getSingleProduct(id);
  singleProductView.showViews(model.state.singleProduct);
  
}
 category1View.singleProductHandler(controlSingleProducts)
 category2View.singleProductHandler(controlSingleProducts)
 currentCategoryView.singleProductHandler(controlSingleProducts)
categoryView.curCategoryViewHandler(controlDisplayCategories);

window.addEventListener("load", controlCategoriesView);

window.addEventListener("load", controlCategories);

console.log(users);
 //registerHandler()
 getAddToCartButtons()

 getUsers(users.token)
