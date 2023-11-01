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
      .then((response) => {
        if (response.status === 200) {
          feedbackMsg.classList.add("success-feedback");
          feedbackMsg.classList.remove("error-feedback");
          return response.text();
        } else {
          feedbackMsg.classList.add("error-feedback");
          feedbackMsg.classList.remove("success-feedback");
          return response.text();
        }
      })
      .then((data) => {
        feedbackMsg.textContent = data;
      });
  }
});
