// Obtém o nome do candidato da URL.
const urlParams = new URLSearchParams(window.location.search);
const nomeCandidato = urlParams.get("nomeCandidato");

// Exibe o nome do candidato na página.
if (nomeCandidato) {
  const nomeCandidatoElement = document.getElementById("nomeCandidatoConfirm");
  nomeCandidatoElement.textContent = nomeCandidato;
} else {
  // Caso o nome do candidato não esteja presente na URL.
  console.error("Nome do candidato não encontrado na URL.");
}
