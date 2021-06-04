import abstractView from './abstractView.js';
import registerView from './registerView.js';
import {API_URL} from '../js/config.js'
class loginView extends abstractView{

login = document.querySelector('.login') 
parentEl=document.querySelector('.loginView')
spinner= document.getElementsByClassName('spinner')
userText=document.querySelector('.user')
    constructor(){
        super()
this.generateMarkup()
this.clearError()


    }
  generateMarkup(){
    return ` <div class="form-container" id='login'>
    <p class="Cancel">X</p>
    <div class="form-head">
        <h3>Login to your account</h3>
    </div>
    <!-- this is the input field to type in your log in details -->
    <form class="form-input">   
        <div> <label class="email" for="Email">Email or Phone Number</label> <br>
            <input type="text" class="Email" id="email">
        </div>
        <div><label for="password">Password</label><br>
            <input type="password" name="" id="password" class='password'>
        </div>
        <div><i class="fa fa-spinner spinner hidden" aria-hidden="true"></i><input class="submit" id='Submit' type="submit" value="LOG IN"></div>
    </form>
    <div class="account-div">
    <p class="login-no-account">Don't have an account? Register</p>
    </div>
    </div>
    <!-- this is the bottom link -->
   `;
}

 removeLogin(){
  this.parentEl.addEventListener('click', function(e){
    const btn= e.target.closest('.Cancel')
     if(!btn) return;
     console.log(btn);
      LoginView.removeOverlay()
        LoginView.parentEl.innerHTML='' 
  })
}
    getHtml(){
      this.addOverlay()
      
      return this.generateMarkup()
    }
   

    getInputValues(){
      try{
        let data
        let email;
        let password;  
         this.parentEl.addEventListener('submit', function(e){
         
         e.preventDefault()
         LoginView.clearError()
         email =document.querySelector('.Email')
         password=document.querySelector('.password')
         const spinner= document.querySelector('.spinner')
        if(!email && !password) return;
        data={Email:email.value, Password: password.value}
         spinner.classList.remove('hidden')
        setTimeout(() => {
          spinner.classList.add('hidden')
         }, 2000);
          getLoginJSON(data)
        
           })
          return data 
         }
         catch(err){
           LoginView.renderError(err)
           console.log(err);
         }}
       loginRedirect(){  
        this.clearError()
        this.parentEl.addEventListener('click', function(e){
           const registerReDirect = e.target.closest('.login-no-account') 
           if (!registerReDirect) return;
            registerView.showViews()       
          })
        }
}
export default new loginView()
const convertName = function(name){
  const capital= name.toLowerCase()
  const remain = name.slice(0,1)
 const converted= `${remain.toUpperCase()}${capital.slice(1, name.length)}!`
 return converted
}
let UserId;
async function getLoginJSON (data){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
              "email": data.Email,
              "password": data.Password,

            });
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            try{

            const res=  await fetch(`${API_URL}/signin`, requestOptions)
             const data= await res.json()
            console.log(data);
            // users.token= data.token
            let userId= data._id
            UserId= userId;
            console.log(res);
       
            if(res.status==400) {
              throw new Error(`${data.message}`);
             }
             if(res.status==500){
              LoginView.renderError(res.statusText)
               throw new Error('Please input your details')
             }
             if(data.isAdmin){
               users.token  = await data.token
               console.log(users.token);
             window.location.replace('./rexha-Admin-dashboard/admin.html')
            }
             if(res.status==200){
              LoginView.removeOverlay()
              LoginView.parentEl.innerHTML='' 
              LoginView.userText.classList.remove('hide')
             
             }
             
             await getUsersData()
          }
            catch(err){
              console.log(err);
              LoginView.renderError(err)
            }
         
   }

  export const users={}  
   async function getUsersData(){
    const getUser= await fetch(`${API_URL}/${UserId}`)
    const userData= await getUser.json()
     users.name= userData.name;
     users.isAdmin=userData.isAdmin
     users.id= userData._id
     users.email=userData.email
    
     users.phoneNumber=userData.phonenumber
      console.log(userData);
     LoginView.userText.innerHTML=`Welcome, ${convertName(userData.name).split(' ')[0]} ` 
   }

const LoginView = new loginView()