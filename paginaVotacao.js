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
  });
});
