const registrationForm = document.getElementById("registrationForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

usernameInput.addEventListener("input", function () {
  validateField(usernameInput);
});

emailInput.addEventListener("input", function () {
  validateField(emailInput);
});

passwordInput.addEventListener("input", function () {
  validatePassword();
});

confirmPasswordInput.addEventListener("input", function () {
  validateConfirmPassword();
});

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  //Added validators to array before if statement so they are all validated at once
  //Ordered from last -> first so that focus goes to first invalid element
  let validators = [
    validateConfirmPassword(),
    validatePassword(),
    validateField(emailInput),
    validateField(usernameInput),
  ];
  if (validators.includes(false)) return;

  const formData = new FormData(registrationForm);
  const usernameValue = formData.get("username");

  localStorage.setItem("username", JSON.stringify({ username: usernameValue }));
  registrationForm.reset();
  alert("Submit Succesful");
});

function validatePassword() {
  passwordInput.setCustomValidity("");
  if (!passwordInput.validity.valid) {
    return validateField(passwordInput);
  }
  if (parseFloat(passwordInput.value) == passwordInput.value) {
    passwordInput.setCustomValidity(
      "Please add an uppercase and lowercase letter",
    );
  } else if (passwordInput.value === passwordInput.value.toLowerCase()) {
    passwordInput.setCustomValidity("Please add a uppercase letter");
  } else if (passwordInput.value === passwordInput.value.toUpperCase()) {
    passwordInput.setCustomValidity("Please add a lowercase letter");
  } else if (!/\d/.test(passwordInput.value)) {
    passwordInput.setCustomValidity("Please add a number");
  }
  return validateField(passwordInput);
}

function validateConfirmPassword() {
  if (passwordInput.value != confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity("Passwords do not match");
  }
  return validateField(confirmPasswordInput);
}

function validateField(targetInput) {
  let closestErrorSpan =
    targetInput.parentElement.getElementsByTagName("span")[0];
  if (!targetInput.validity.valid) {
    closestErrorSpan.textContent = targetInput.validationMessage;
    targetInput.classList.remove("valid");
    targetInput.classList.add("invalid");
    targetInput.focus();
    return false;
  }
  targetInput.classList.remove("invalid");
  targetInput.classList.add("valid");
  closestErrorSpan.textContent = "";
  return true;
}

try {
  let storedUsername = localStorage.getItem("username");
  if (storedUsername !== null) {
    let usernameValue = JSON.parse(storedUsername)["username"];
    usernameInput.value = usernameValue;
  }
} catch (error) {
  console.log("Error fetching stored username ", error);
}
