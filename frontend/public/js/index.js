const form = document.querySelector("form");
const feedbackMsg = document.getElementById("feedback-msg");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const candidatoSelecionado = document.querySelector(
    'input[name="candidato"]:checked'
  );

  if (candidatoSelecionado) {
    const nomeCandidato = candidatoSelecionado.value;

    fetch("/api/votos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ candidato: nomeCandidato }),
    })
      .then((response) => response.json())
      .then((data) => {
        feedbackMsg.textContent = data.message;
        feedbackMsg.classList.add("success-feedback");
        feedbackMsg.classList.remove("error-feedback");
      })
      .catch((error) => {
        feedbackMsg.textContent = "Erro ao votar.";
        feedbackMsg.classList.add("error-feedback");
        feedbackMsg.classList.remove("success-feedback");
      });
  } else {
    feedbackMsg.textContent = "Por favor, escolha um candidato antes de votar.";

    feedbackMsg.classList.add("error-feedback");
    feedbackMsg.classList.remove("success-feedback");
  }
});
