document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/contagem")
    .then((response) => response.json())
    .then((data) => {
      const votosCandidato1 = document.getElementById("votosCandidato1");
      const votosCandidato2 = document.getElementById("votosCandidato2");

      data.forEach((item) => {
        if (item.candidato === "Candidato 1") {
          votosCandidato1.textContent = `${item.contagem} voto${
            item.contagem !== 1 ? "s" : ""
          }`;
        } else if (item.candidato === "Candidato 2") {
          votosCandidato2.textContent = `${item.contagem} voto${
            item.contagem !== 1 ? "s" : ""
          }`;
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
