import abstractView from "./abstractView.js";

class successfulMessage extends abstractView{
  generateMarkup(){
      return ` <p class="successMessage">Your account has been successfully registered. An email has been sent to you, click on the link to verify your account and login</p>`
  }
  getHtml(){
    return this.generateMarkup()
  }
}
export default new successfulMessage()