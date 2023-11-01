function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("togglePassword");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
}

const form = document.querySelector("form");
const feedbackMsg = document.getElementById("feedback-msg");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/registro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((response) => {
    if (response.status === 200) {
      feedbackMsg.textContent = "Registro bem-sucedido.";
      feedbackMsg.classList.add("success-feedback");
      feedbackMsg.classList.remove("error-feedback");
      setTimeout(() => {
        window.location.href = "/votacao";
      }, 1500);
    } else if (response.status === 400) {
      feedbackMsg.textContent = "Usuário já registrado.";
      feedbackMsg.classList.remove("success-feedback");
      feedbackMsg.classList.add("error-feedback");
    }
  });
});
