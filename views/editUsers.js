import abstractView from './abstractViews.js'
export default class extends abstractView{
    constructor(){
        super()  
    } 
  async getHtml(){
            return `<div class="personalDataDiv">
            <form class="personalData">
                <div>
                    <h2> Your Personal Data</h2>
                </div>
                <div class="userIdentity">
                    <input type="text" placeholder="First name" id="personalDataFirstName">
                    <input type="text" placeholder="Last name" id="personalDataLastname">
                    <input type="email" name="" id="personalDataLastnameEmail" placeholder="Email Address">
                    <input type="tel" name="" id="PersonalDataPhone" placeholder="Mobile Number">
                </div>
                <div class="radioButtons">
                    <input type="radio" name="gender" id="Male" value="male">
                    <label for="male">Male</label>
                    <input type="radio" name="gender" id="Female" value="Female">
                    <label for="female">Female</label>
                </div>
                <div class="saveButton">
                    <input class="save" type="submit" value="Save"></div>
    
                <h3>Change Password</h3>
                <div class="userIdentity">
                    <input type="password" name="" id="nurrentPasswordChange" placeholder="Current Password">
                    <input type="password" name="" id="newPasswordChange" placeholder="New Password">
                  <p  id="changePassword"> Change Password </p>
                </div>
            </form>
                     `
            }
}