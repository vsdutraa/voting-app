let nomeCandidatoSelecionado = '';

// Seleciona todos os elementos com a classe "candidato".
const candidatos = document.querySelectorAll(".candidato");

// Adiciona um event listener para cada elemento.
candidatos.forEach(candidato => {
  candidato.addEventListener("click", function() {
    // Adiciona a classe "active" ao elemento clicado.
    this.classList.add("active");

    // Remove a classe "active" de todos os outros elementos.
    candidatos.forEach(outroCandidato => {
      if (outroCandidato !== this) {
        outroCandidato.classList.remove("active");
      }
    });

    // Obtém o nome do candidato ativo.
    nomeCandidatoSelecionado = this.querySelector(".nomeCandidato p").textContent;
  });
});


// Seleciona o botão "Votar".
const botaoVotar = document.querySelector("button");

// Adiciona um event listener para o botão "Votar".
botaoVotar.addEventListener("click", function() {
  console.log("Botão")
    // Codifica o nome do candidato selecionado para ser usado em uma URL.
  const nomeCandidatoCodificado = encodeURIComponent(nomeCandidatoSelecionado);

  // Redireciona para a próxima página com o nome do candidato como parâmetro de consulta.
  window.location.href = `confirmacaoVoto.html?nomeCandidato=${nomeCandidatoCodificado}`;
});