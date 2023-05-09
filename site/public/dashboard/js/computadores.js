window.addEventListener("load", function () {
  buscarParametro();
});

var amarRede;
var amarRam;
var amarCpu;
var amarDisco;
var vermRede;
var vermRam;
var vermCpu;
var vermDisco;

function buscarParametro() {
  // fkEmpresa = sessionStorage.FK_EMPRESA;
  fkEmpresa = 1;

  fetch(`/pc/buscarParametro/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
    if (resposta.ok) {

      resposta.json().then(function (resposta) {
        console.log("PARAMETROS: ", JSON.stringify(resposta));
        amarRede = resposta[0].valor;
        amarRam = resposta[1].valor;
        amarCpu = resposta[2].valor;
        amarDisco = resposta[3].valor;
        vermRede = resposta[4].valor;
        vermRam = resposta[5].valor;
        vermCpu = resposta[6].valor;
        vermDisco = resposta[7].valor;
        listarPc();
      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);

  });
}


function listarPc() {
  var computadores = [];

  fetch(`/pc/buscarPc/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
    if (resposta.ok) {

      resposta.json().then(function (resposta) {
        console.log("Dados recebidos: ", JSON.stringify(resposta));

        var qtdPc = resposta.length;
        var ax01 = 0;
        var ax02 = 1;
        var ax03 = 2;
        var ax04 = 3;

        for (let i = 0; i < qtdPc; i++) {
          var registro = resposta[i];

          if (i == ax01) {
            var pc = {
              setor: registro.setor,
              hostname: registro.hostname,
              mac: registro.mac,
              rede: registro.valor,
              vRede: 0,
              vRam: 0,
              vCpu: 0,
              vDisco: 0,
              aRede: 0,
              aRam: 0,
              aCpu: 0,
              aDisco: 0,
              alertasAmar: 0,
              alertasVerm: 0
            }

            if (registro.valor >= vermRede) {
              pc.vRede += 1;
              pc.alertasVerm += 1;
            } else if (registro.valor > amarRede) {
              pc.aRede += 1;
              pc.alertasAmar += 1;
            }
            ax01 += 4;
          }


          if (i == ax02) {
            pc["ram"] = registro.valor;
            ax02 += 4;

            ramVer = (vermRam / 100) * registro.numeroChave;
            ramAmar = (amarRam / 100) * registro.numeroChave;

            if (registro.valor >= ramVer) {
              pc.vRam += 1;
              pc.alertasVerm += 1;
            } else if (registro.valor > ramAmar) {
              pc.aRam += 1;
              pc.alertasAmar += 1;
            }
          }

          if (i == ax03) {
            pc["cpu"] = registro.valor;
            ax03 += 4;

            if (registro.valor >= vermCpu) {
              pc.vCpu += 1;
              pc.alertasVerm += 1;
            } else if (registro.valor > amarCpu) {
              pc.aCpu += 1;
              pc.alertasAmar += 1;
            }
          }

          if (i == ax04) {
            pc["disco"] = registro.valor;
            ax04 += 4;

            discoVer = (vermDisco / 100) * registro.numeroChave;
            discoAmar = (amarDisco / 100) * registro.numeroChave;

            if (registro.valor >= discoVer) {
              pc.vDisco += 1;
              pc.alertasVerm += 1;
            } else if (registro.valor > discoAmar) {
              pc.aDisco += 1;
              pc.alertasAmar += 1;
            }

            computadores.push(pc);
          }
        }

        console.log("PC: ", JSON.stringify(computadores));
        ordenarPc(computadores);
      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);

  });

}

function ordenarPc(computadores) {
  var computadoresOrdenados = [];

  for (let i = 0; i < computadores.length; i++) {
    pcAtual = computadores[i];
    var adicionado = false;

    if (i == 0) {

      computadoresOrdenados.push(pcAtual);

    } else {

      for (let c = 0; c < computadoresOrdenados.length; c++) {
        pcOrdenado = computadoresOrdenados[c];

        if (adicionado == false) {
          if (pcAtual.alertasVerm > pcOrdenado.alertasVerm) {
            computadoresOrdenados.splice((c), 0, pcAtual)
            adicionado = true;
          } 
        }

        if (adicionado == false) {
          if (pcAtual.alertasAmar > pcOrdenado.alertasAmar) {
            computadoresOrdenados.splice(c, 0, pcAtual)
            adicionado = true;
          }
        }

        if (adicionado == false) {
          if (pcAtual.alertasVerm == pcOrdenado.alertasVerm) {
            computadoresOrdenados.splice((c + 1), 0, pcAtual)
            adicionado = true;
          }
        }

        if (adicionado == false) {
          if (pcAtual.alertasAmar == pcOrdenado.alertasAmar) {
            computadoresOrdenados.splice((c + 1), 0, pcAtual)
            adicionado = true;
          }
        }

      }
    }
  }

  console.log("PC ORDENADOS: ", JSON.stringify(computadoresOrdenados));

}


function criarCards() {

  const pai = document.querySelector('.pc-container');

  // Define a quantidade de divs que você deseja criar
  const quantidadeDivs = 5;

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
    novaImg.src = '../assets/computador/pc.png';
    novaImg.alt = '';
    divImg.appendChild(novaImg);

    // Cria a segunda div filha da divBox com o texto
    const divTexto = document.createElement('div');
    divTexto.classList.add('textoBox');
    const p1 = document.createElement('p');
    p1.textContent = 'Setor: A';
    const p2 = document.createElement('p');
    p2.textContent = 'HOSTNAME:';
    const p3 = document.createElement('p');
    p3.textContent = 'MAC:';
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
function reiniciar_window() {
  window.location = "../html/computadores_reinicio.html";
}

function pcIndiv_window() {
  window.location = "../html/computadorIndividual.html";
}
