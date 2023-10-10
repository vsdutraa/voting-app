document.addEventListener("DOMContentLoaded", function () {
  const votos = JSON.parse(localStorage.getItem("votos")) || [];

  const contagem = contarVotos(votos);

  atualizarContagem("votosCandidato1", contagem["Candidato 1"]);
  atualizarContagem("votosCandidato2", contagem["Candidato 2"]);
});

function contarVotos(votos) {
  const contagem = {
    "Candidato 1": 0,
    "Candidato 2": 0,
  };

  votos.forEach(function (voto) {
    contagem[voto]++;
  });

  return contagem;
}

function atualizarContagem(elementId, contagem) {
  const elemento = document.getElementById(elementId);
  if (elemento) {
    elemento.textContent = `${contagem} voto${contagem !== 1 ? "s" : ""}`;
  }
}
