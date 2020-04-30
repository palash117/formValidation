const state = {
  SUCCESS: 1,
  ERROR: 2,
  NORMAL: 3,
};
class Input {
  constructor(inputName) {
    let inputErrorName = inputName + "Error";
    this.input = document.getElementById(inputName);
    this.inputError = document.getElementById(inputErrorName);
    this.state = state.NORMAL;
    this.errorList = [];
  }

  getState() {
    return this.state;
  }
  getValue() {
    return this.input.value;
  }
  getName() {
    return `${this.input.id.charAt(0).toUpperCase()}${this.input.id.slice(1)}`;
  }

  // FORM INPUT STATE TRANSITIONS
  error() {
    this.state = state.ERROR;
    this.input.classList.remove("success");
    this.input.classList.add("error");
    this.inputError.classList.add("error");
    this.inputError.innerHTML = this.errorList.join(", ");
  }

  success() {
    this.state = state.SUCCESS;
    this.input.classList.remove("error");
    this.inputError.classList.remove("error");
    this.input.classList.add("success");
  }

  // FORM INPUT STATE RESET
  reset() {
    this.state = state.NORMAL;
    this.errorList = [];
    this.inputError.classList.remove("error");
    this.inputError.classList.remove("success");
    return this;
  }

  // FORM INPUT VALUE UPDATE BASED ON STATE
  update() {
    if (this.state == state.ERROR) {
      this.error();
    } else {
      this.success();
    }
  }
  // VALIDATIONS

  checkNotEmpty() {
    if (this.getValue().trim() === "") {
      this.state = state.ERROR;
      this.errorList.push(`${this.getName()} cannot be empty`);
    }
    return this;
  }

  checkMinMax(min, max) {
    if (this.getValue().trim().length < min) {
      this.state = state.ERROR;
      this.errorList.push(`${this.getName()} cannot be less than ${min}`);
    }
    if (this.getValue().trim().length > max) {
      this.state = state.ERROR;
      this.errorList.push(`${this.getName()} cannot be more than ${max}`);
    }
    return this;
  }

  checkContentEquals(otherInput) {
    if (this.getValue().trim() !== otherInput.getValue().trim()) {
      this.state = state.ERROR;
      this.errorList.push(
        `${this.getName()} not equal to  ${otherInput.getName()}`
      );
    }
    return this;
  }

  checkEmailRegex() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.getValue().trim())) {
      this.state = state.ERROR;
      this.errorList.push(`${this.getName()} not valid email`);
    }
    return this;
  }
}
var username = new Input("username");
var email = new Input("email");
var password = new Input("password");
var confirmPassword = new Input("confirmPassword");

var submit = document.getElementById("submit");

function validate() {
  username.reset().checkNotEmpty().checkMinMax(3, 15).update();
  email.reset().checkNotEmpty().checkEmailRegex().update();
  password.reset().checkNotEmpty().update();
  confirmPassword.reset().checkNotEmpty().checkContentEquals(password).update();
}

submit.addEventListener("click", validate);
