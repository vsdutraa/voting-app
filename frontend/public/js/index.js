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

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((response) => {
    if (response.status === 200) {
      window.location.href = "/votacao";
    } else if (response.status === 401) {
      feedbackMsg.textContent = "Usuário não encontrado ou senha incorreta.";
      feedbackMsg.classList.remove("success-feedback");
      feedbackMsg.classList.add("error-feedback");
    }
  });
});
