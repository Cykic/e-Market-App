export const state ={
    products: [],
    singleProduct:[],
    categories:[],
    currentCategory:[],
    category1:[],
    category2:[]
 }
 export async function getProducts(){
  const res= await fetch(`https://shopappanter.herokuapp.com/api/products`)
 const data = await res.json()
 state.products = data.products
 console.log(state.products)
 const cate1=state.products.filter(product=> product.category==state.categories[0])
 const cate2=state.products.filter(product=> product.category==state.categories[1])
 state.category2=cate2
 state.category1=cate1
 console.log(data);
 
 }
 export async function getCategories(){
    try{
  const categories= await fetch('https://shopappanter.herokuapp.com/api/products/categories')
 const categoryData = await categories.json()
 console.log(categoryData);
 state.categories= categoryData;
 
    }
    catch(err)
    { console.log(err);
       throw err;
      
    }
 }
 export async function getSingleProduct(id){
    try{
    const res = await fetch(`https://shopappanter.herokuapp.com/api/products/${id}`)
    const product= await res.json()
    state.singleProduct=product
    console.log(product);
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
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 