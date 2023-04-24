window.addEventListener("load", function () {
  gerarPc();
});

function gerarPc() {
  const pai = document.querySelector('.pc-container');

  // Define a quantidade de divs que você deseja criar
  const quantidadeDivs = 15;

  // Loop for para criar as novas divs
  for (let i = 0; i < quantidadeDivs; i++) {
    // Cria uma nova div com a classe "pcIndiv"
    const novaDiv = document.createElement('div');
    novaDiv.classList.add('pcIndiv');

    novaDiv.addEventListener('click', function () {
      pcIndiv_window();
    });

    // Cria a primeira div filha com a classe "box"
    const divBox = document.createElement('div');
    divBox.classList.add('box');

    // Adiciona as duas divs filhas a primeira div pai
    novaDiv.appendChild(divBox);

    // Cria a primeira div filha da divBox com a imagem
    const divImg = document.createElement('div');
    divImg.classList.add('imgBox');
    const novaImg = document.createElement('img');
    novaImg.src = '../assets/computador/iconPc.png';
    novaImg.alt = '';
    divImg.appendChild(novaImg);

    // Cria a segunda div filha da divBox com o texto
    const divTexto = document.createElement('div');
    divTexto.classList.add('textoBox');
    const p1 = document.createElement('p');
    p1.textContent = 'Setor: A';
    const p2 = document.createElement('p');
    p2.textContent = 'Número identificado';
    const p3 = document.createElement('p');
    p3.textContent = 'PE21323DACB';
    divTexto.appendChild(p1);
    divTexto.appendChild(p2);
    divTexto.appendChild(p3);

    // Adiciona as duas divs filhas a primeira div filha da novaDiv
    divBox.appendChild(divImg);
    divBox.appendChild(divTexto);

    // Cria a segunda div filha com as classes "boxStatus" e "status"
    const divStatus = document.createElement('div');
    divStatus.classList.add('boxStatus', 'status');

    // Cria as quatro divs filhas da divStatus com as classes correspondentes
    const divRede = document.createElement('div');
    divRede.classList.add('rede', 'status');
    const divRam = document.createElement('div');
    divRam.classList.add('ram', 'status');
    const divCpu = document.createElement('div');
    divCpu.classList.add('cpu', 'status');
    const divDisco = document.createElement('div');
    divDisco.classList.add('disco', 'status');

    divRede.innerHTML = "Rede";
    divRam.innerHTML = "RAM";
    divCpu.innerHTML = "CPU";
    divDisco.innerHTML = "Disco";

    // Adiciona as quatro divs filhas a segunda div filha da novaDiv
    divStatus.appendChild(divRede);
    divStatus.appendChild(divRam);
    divStatus.appendChild(divCpu);
    divStatus.appendChild(divDisco);
    novaDiv.appendChild(divStatus);

    // Adiciona a novaDiv ao elemento pai
    pai.appendChild(novaDiv);
  }
}

function gerenciar_window() {
  window.location = "../html/computadores_gerenciar.html";
}

function pcIndiv_window() {
  window.location = "../html/computadorIndividual.html";
}