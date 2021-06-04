import abstractView from './abstractView.js'
import loginView from './loginView.js'
import {API_URL} from '../js/config.js'
import successfulMessage from './successfulMessage.js'

class registerView extends abstractView{
    constructor(){
        super()
        this.clearError()
    }

    _password
    // togglePassword(input) {
    //   var x = document.querySelector();
    //   if(!x) return;
    //   if (x.type === "password") {
    //     x.type = "text";
    //   } else {
    //     x.type = "password";
    //   }
    // }
    register = document.querySelector('.register')
    parentEl=document.querySelector('.loginView')
    userText=document.querySelector('.user')
   
     
    Validatemobile(input) {
      let validRegex = /^\+[1-9]{1}[0-9]{3,14}$/;
      if (input.value.match(validRegex)) {
    
        return true;
    
      } else {
          this.renderError("Mobile number is invalid")
         throw new Error("Invalid phone number!"); 
      }
    }
     confirmPassword(input1, input2){
       if(input1.value==input2.value){
         return true
       }
       else{
         this.renderError('Your two passwords must match')
         throw new Error('Your passwords do not match')
       }
     }

   CheckPassword(inputtxt) 
    { 
    let paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if(inputtxt.value.match(paswd)) 
    { 
    return true;
    }
    else
    { 
      this.renderError("Input Password must be 7 to 15 characters which contain at least one numeric digit and a special character")
      throw new Error("Invalid password"); 
    }
    }  
    
     validateFullname(name){
      let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
      if(!regName.test(name.value)){
          this.renderError('Please enter your full name (first & last name).')
          throw new Error('Please enter your full name (first & last name).'); 
      }else{
          return true;
      }
  }
  

  async getHtml(){
    this.addOverlay()
   
        return `<div class="form-container registerFormContainer" id='register'>
        <p class="CancelRegister">X</p>
        <div class="form-head">
            <h3>Create a new account</h3>
        </div>
        <form class="registerForm form-input">  
        <div > <label class="fullName" for="text">Full name</label> <br>
        <input type="text" id="fullName" class='registerFullName' placeholder="Last name 
                           First name">
         </div> 
   <div  class= 'registerflex'>
   
         <div> <label class="phone" for="text">Mobile Number</label> <br>
         <input type="text" id="Mobile Number" class='registerPhone' placeholder="+234">
          </div> 
            <div> <label class="email" for="Email">Email</label> <br>
                <input type="text" id="email" class='registerEmail'>
            </div>
            <div><label for="password">Password</label><br>
            <input type="password"  name="" id="password" class='registerPassword' title=' Must contain at least eight characters'>      
          </div>
          <div><label for="password">Confirm Password</label><br>
            <input type="password"  name="" id="password2" class='registerPassword confirmPassword' title=' Must contain at least eight characters'>      
          </div>
    </div>
            <div><i class="fa fa-spinner spinner hidden" aria-hidden="true"></i><input class="submitRegister" type="submit" value="REGISTER"></div>
            <div class="passwordCheck"> <p >Input Password must be 7 to 15 characters which contain at least one numeric digit and a special character</p></div>
            </form>
            <div class="account-div">
    
            <p class="no-account-register">Already have an account? Login </p>
        </div>
    </div>
   `
    }
//  registrationHandler(){ 
//      this.register.addEventListener('click', this.showViews.bind(this))
//  }
removeRegistration(){
  this.parentEl.addEventListener('click', function(e){
    const btn= e.target.closest('.CancelRegister')
     if(!btn) return;
      register.removeOverlay()
        register.parentEl.innerHTML='' 
  })
}

 async getInputValues(){
   try{
     let data;
    let email;
    let fullName;
    let phoneNumber;
    let password;
    let confirmPassword
    this.parentEl.addEventListener('submit', function(e){
    e.preventDefault()
    register.clearError()
         fullName =document.querySelector('.registerFullName')
         email =document.querySelector('.registerEmail')
         phoneNumber = document.querySelector('.registerPhone')
         password=document.querySelector('.registerPassword')
         confirmPassword= document.querySelector('.confirmPassword')
         const spinner= document.querySelector('.spinner')
         this._password= password
      if(!email && !password) return;
      register.validateFullname(fullName)
      register.ValidateEmail(email)
      register.Validatemobile(phoneNumber)
      register.CheckPassword(password)
      register.confirmPassword(password, confirmPassword)
      data={name: fullName.value, email: email.value, password: password.value, Phone: phoneNumber.value}
      
      spinner.classList.remove('hidden')
       setTimeout(() => {
        spinner.classList.add('hidden')
       }, 2000);
      
      getJSON(data)  
       }) 
     return data 
    }
      catch(err){
      console.log(err);
      }
}
  registerRedirect(){
    this.clearError()
this.parentEl.addEventListener('click', function(e){
   const registerReDirect = e.target.closest('.no-account-register') 
   if (!registerReDirect) return;
    loginView.showViews()
  })
}
}
   async function getJSON (data){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
              "name": data.name,
              "email": data.email,
              "password": data.password,
              "phonenumber": data.Phone
            });
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            try{
            const res=  await fetch(`${API_URL}/register`, requestOptions)
             const data= await res.json()
            console.log(data);
            console.log(res);
            if(res.status==400) {
              throw new Error(`${data.message}`);
             }
             if(res.status==500){
               throw new Error(res.statusText)
             }
             if (res.status==200){
               successfulMessage.showViews()
             }
          }
            catch(err){
              console.log(err);
              register.renderError(err)
            }
          }  
    const register= new registerView()
export default new registerView()