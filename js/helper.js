export function warning(message) {
  const warning = document.querySelector(".warning");
  warning.textContent = message;
  setTimeout(() => warning.classList.toggle("hide"), 2000);
  setTimeout(() => warning.classList.toggle("hide"),500);
  
}
// ADDED ALERT
export function addedAlert() {
  const warning = document.querySelector(".added-cart");
  // warning.textContent = message;
  warning.classList.toggle("hide");
  setTimeout(() => warning.classList.toggle("hide"), 1500);
}


// SPINNER
export function spinner(bool) {
  const spinner = document.querySelector(".sk-chase");
  bool ? spinner.classList.remove("hide") : spinner.classList.add("hide");
}
