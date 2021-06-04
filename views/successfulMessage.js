import abstractView from "./abstractView.js";

class successfulMessage extends abstractView{
  constructor(){
    super()
    this.removeRegistration()
  }
  parentEl=document.querySelector('.loginView')
  generateMarkup(){
    
      return ` <div class="form-container registerFormContainer" id='register'>
      <p class="CancelRegister">X</p>
      <p class="successMessage">Your account has been successfully registered. An email has been sent to you, click on the link to verify your account and login</p></div>`
  }
  getHtml(){
    return this.generateMarkup()
  }
  removeRegistration(){
    if(!this.parentEl) return;
    this.parentEl.addEventListener('click', function(e){
      const btn= e.target.closest('.CancelRegister')
       if(!btn) return;
        successfully.removeOverlay()
       
          successfully.parentEl.innerHTML='' 
    })
  }
}
export default new successfulMessage()
const successfully= new successfulMessage()