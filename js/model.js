export const state ={
    products: [],
    singleProduct:[],
    categories:[],
    currentCategory:[],
    category1:[],
    category2:[],
    category1All:[],
    category2All:[]
 }
 const timeout = function (s) {
   return new Promise(function (_, reject) {
     setTimeout(function () {
       reject(new Error(`Timeout! Request took too long!`));
     }, s * 1000);
   });
 };
 export async function getProducts(){
    try{
      const res= await Promise.race([fetch(`https://shopappanter.herokuapp.com/api/products`), timeout(10)])
      const data = await res.json()
      state.products = data.products
      // console.log(state.products)
      

    }
    catch(err){
       console.log(err);
       throw err
    }
 }
 export async function getCategories(){
    try{
  const categories= await Promise.race([fetch('https://shopappanter.herokuapp.com/api/products/categories'), timeout(10)]) 
 const categoryData = await categories.json()
 
 state.categories= categoryData;
 const cate1=state.products.filter(product=> product.category==state.categories[0])
      const cate2=state.products.filter(product=> product.category==state.categories[1])
      state.category2=cate2.slice(0,2)
      state.category1=cate1.slice(0,2)
      state.category1All=cate1
      state.category2All=cate2
      
 
    }
    catch(err)
    { console.log(err);
       throw err;
      
    }
 }
 export async function getSingleProduct(id){
    try{
    const res = await Promise.race([fetch(`https://shopappanter.herokuapp.com/api/products/${id}`), timeout(10)]) 
    const product= await res.json()
    state.singleProduct=product
   
    }
    catch(err){
       console.log(err);
       throw err
    }
 }
 
  export function displayCategories(category){
   const curCategory = state.products.filter(product=> product.category==category)
    state.currentCategory=curCategory
   
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 