"use strict";
const form = document.querySelectorAll("form");
const show_password = document.querySelectorAll(".show-password");
const inputsLogin = form[0].querySelectorAll(".input");
const inputsSignup = form[1].querySelectorAll(".input");

const showAndHidePassword = (p) => {
  if (p === "login") {
    if (inputsLogin[2].type === "password") {
      inputsLogin[2].type = "text";
      show_password[0].innerHTML = "&#xf7ec;"; // 🛡️
    } else if (inputsLogin[2].type === "text") {
      inputsLogin[2].type = "password";
      show_password[0].innerHTML = "&#xea9a;"; // 👁️
    }
  } else { // Signup
    if (inputsSignup[2].type === "password") {
      inputsSignup[2].type = "text";
      show_password[1].innerHTML = "&#xf7ec;"; // 🛡️
    } else if (inputsSignup[2].type === "text") {
      inputsSignup[2].type = "password";
      show_password[1].innerHTML = "&#xea9a;"; // 👁️
    }
  }
}

const submitLogin = () => {
  if (inputsLogin[2].value.length < 8) {
    alert("Strong Password is requirement");
    return false;
  }
}

const submitSignup = () => {
  if (inputsSignup[2].value.length < 8) {
    alert("Strong Password is requirement");
    return false;
  }
}