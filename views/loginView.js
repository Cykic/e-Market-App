import abstractView from './abstractView.js';
import registerView from './registerView.js';
import {API_URL} from '../js/config.js'
class loginView extends abstractView{

login = document.querySelector('.login') 
parentEl=document.querySelector('.loginView')
spinner= document.getElementsByClassName('spinner')
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
        <div> <i class="spinner fa fa-spinner hidden" aria-hidden="true"></i><input class="submit" id='Submit' type="submit" value="LOG IN"></div>
    </form>
    <div class="account-div">
    <p class="login-no-account"><a href="#registration" data-link >Don't have an account? Register</a> </p>
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
   
    loginHandler(){
     
    this.login.addEventListener('click', this.showViews.bind(this))
    }

    getInputValues(){
        let data
        let email;
       let spinner
        let password;  
         this.parentEl.addEventListener('submit', function(e){
          LoginView.clearError()
         
         e.preventDefault()
         spinner= document.querySelector('.spinner')
         spinner.classList.remove('hidden')
         email =document.querySelector('.Email')
         password=document.querySelector('.password')
        if(!email && !password) return;
        data={Email:email.value, Password: password.value}
       
          getLoginJSON(data)
          spinner.classList.add('hidden')
         
           })
     
         }
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
            console.log(data.email, data.password);
            console.log(res);
            if(res.status==400) {
              throw new Error(`${data.message}`);
             }
             if(res.status==500){
               throw new Error('Please input your details')
             }
          }
            catch(err){
              console.log(err);
              LoginView.renderError(err)
            }
   }
const LoginView = new loginView()