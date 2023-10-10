const votos = JSON.parse(localStorage.getItem("votos")) || [];

const form = document.querySelector("form");

const feedbackMsg = document.getElementById("feedback-msg");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const candidatoSelecionado = document.querySelector(
    'input[name="candidato"]:checked'
  );

  if (candidatoSelecionado) {
    const nomeCandidato = candidatoSelecionado.nextElementSibling.textContent;
    votos.push(nomeCandidato);
    localStorage.setItem("votos", JSON.stringify(votos));

    feedbackMsg.textContent = "Seu voto foi computado com sucesso!";

    feedbackMsg.classList.add("success-feedback");
    feedbackMsg.classList.remove("error-feedback");
  } else {
    feedbackMsg.textContent = "Por favor, escolha um candidato antes de votar.";

    feedbackMsg.classList.add("error-feedback");
    feedbackMsg.classList.remove("success-feedback");
  }
});
