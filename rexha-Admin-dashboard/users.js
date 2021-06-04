//  const state={
//      users:[]
//  }
// async function getUsers(){
//   const getJSON= await fetch('https://shopappanter.herokuapp.com/api/users')
//   const data= await getJSON.json()
//   console.log(data);

import { users } from "../views/loginView.js";

// }
console.log(users);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFlMjMxOWEzN2QzMjE2ZTgyMWZkZWIiLCJuYW1lIjoiV2lubmVyIiwiZW1haWwiOiJ3aW5uZXJha2FrbzA5QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjp0cnVlLCJpYXQiOjE2MjI4MTA5MDgsImV4cCI6MTYyMjg5NzMwOH0.6E3s5f_CzFnpEuxwcwtcppUb9YTcDaxpR3uqw1Fsxpc'
export const getUsers = async (token)=>{
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}` );
myHeaders.append("Content-Type", "application/json");



var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://shopappanter.herokuapp.com/api/users", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
 