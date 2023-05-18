window.addEventListener("load", function () {
  buscarParametro();
});

var amarRedeParam;
var amarRamParam;
var amarCpuParam;
var amarDiscoParam;
var vermRedeParam;
var vermRamParam;
var vermCpuParam;
var vermDiscoParam;

function buscarParametro() {
  fkEmpresa = sessionStorage.FK_EMPRESA;
  // fkEmpresa = 1;

  fetch(`/pc/buscarParametro/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
    if (resposta.ok) {

      resposta.json().then(function (resposta) {
        console.log("PARAMETROS: ", JSON.stringify(resposta));
        amarRedeParam = resposta[0].valor;
        amarRamParam = resposta[1].valor;
        amarCpuParam = resposta[2].valor;
        amarDiscoParam = resposta[3].valor;
        vermRedeParam = resposta[4].valor;
        vermRamParam = resposta[5].valor;
        vermCpuParam = resposta[6].valor;
        vermDiscoParam = resposta[7].valor;
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

            if (registro.valor >= vermRedeParam) {
              pc.vRede += 1;
              pc.alertasVerm += 1;
            } else if (registro.valor > amarRedeParam) {
              pc.aRede += 1;
              pc.alertasAmar += 1;
            }
            ax01 += 4;
          }


          if (i == ax02) {
            pc["ram"] = registro.valor;
            ax02 += 4;

            ramVer = (vermRamParam / 100) * registro.numeroChave;
            ramAmar = (amarRamParam / 100) * registro.numeroChave;

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

            if (registro.valor >= vermCpuParam) {
              pc.vCpu += 1;
              pc.alertasVerm += 1;
            } else if (registro.valor > amarCpuParam) {
              pc.aCpu += 1;
              pc.alertasAmar += 1;
            }
          }

          if (i == ax04) {
            pc["disco"] = registro.valor;
            ax04 += 4;

            discoVer = (vermDiscoParam / 100) * registro.numeroChave;
            discoAmar = (amarDiscoParam / 100) * registro.numeroChave;

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

        console.log("COMPUTADORES ENCONTRADOS: ", JSON.stringify(computadores));
        console.log("COMPUTADORES QUANTIDADE: ", JSON.stringify(computadores.length));
        ordenarPc(computadores);
      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);

  });

}

const pcPorPagina = 15;
var indicePaginaAtual = 0;
var pcOrdenadoGlobal = null;

function ordenarPc(computadores) {
  var computadoresVerm = [];
  var adicionarVerm = true;

  var computadoresAmar = [];
  var adicionarAmar = true;

  var computadoresVerd = [];

  for (let i = 0; i < computadores.length; i++) {
    var adicionarMaior = true;
    var adicionarIgual = true;
    var adicionarMenor = true;
    var adicionado = false;
    pcAtual = computadores[i];

    if (!adicionado) {
      if (pcAtual.alertasVerm > 0) {
        if (adicionarVerm) {
          computadoresVerm.push(pcAtual);
          adicionarVerm = false;
        } else {
          for (let v = 0; v < computadoresVerm.length; v++) {
            pcVerm = computadoresVerm[v];
  
            if (adicionarMaior) {
              if (pcAtual.alertasVerm > pcVerm.alertasVerm) {
                computadoresVerm.splice(v, 0, pcAtual)
                adicionarMaior = false;
                adicionarIgual = false;
                adicionarMenor = false;
              }
            }
  
            if (adicionarIgual) {
              if (pcAtual.alertasVerm == pcVerm.alertasVerm) {
                adicionarMaior = false;
                adicionarMenor = false;
                if (v == (computadoresVerm.length - 1)) {
                  computadoresVerm.splice((v + 1), 0, pcAtual);
                  adicionarIgual = false;
                } else if (pcAtual.alertasVerm != computadoresVerm[v + 1].alertasVerm) {
                  computadoresVerm.splice((v + 1), 0, pcAtual);
                  adicionarIgual = false;
                }
              }
            }
  
            if (adicionarMenor) {
              if (pcAtual.alertasVerm < pcVerm.alertasVerm) {
                adicionarMaior = false;
                adicionarIgual = false;
                if (v == (computadoresVerm.length - 1)) {
                  computadoresVerm.splice((v + 1), 0, pcAtual);
                  adicionarMenor = false;
                } else if (pcAtual.alertasVerm >= computadoresVerm[v + 1].alertasVerm) {
                  computadoresVerm.splice((v + 1), 0, pcAtual);
                  adicionarMenor = false;
                }
              }
            }
          }
        }
        adicionado = true;
      }
    }

    if (!adicionado) {
      if (pcAtual.alertasAmar > 0) {
        if (adicionarAmar) {
          computadoresAmar.push(pcAtual);
          adicionarAmar = false;
        } else {
          for (let v = 0; v < computadoresAmar.length; v++) {
            pcAmar = computadoresAmar[v];

            if (adicionarMaior) {
              if (pcAtual.alertasAmar > pcAmar.alertasAmar) {
                computadoresAmar.splice(v, 0, pcAtual)
                adicionarMaior = false;
                adicionarIgual = false;
                adicionarMenor = false;
              }
            }

            if (adicionarIgual) {
              if (pcAtual.alertasAmar == pcAmar.alertasAmar) {
                adicionarMaior = false;
                adicionarMenor = false;
                if (v == (computadoresAmar.length - 1)) {
                  computadoresAmar.splice((v + 1), 0, pcAtual);
                  adicionarIgual = false;
                } else if (pcAtual.alertasAmar != computadoresAmar[v + 1].alertasAmar) {
                  computadoresAmar.splice((v + 1), 0, pcAtual);
                  adicionarIgual = false;
                }
              }
            }

            if (adicionarMenor) {
              if (pcAtual.alertasAmar < pcAmar.alertasAmar) {
                adicionarMaior = false;
                adicionarIgual = false;
                if (v == (computadoresAmar.length - 1)) {
                  computadoresAmar.splice((v + 1), 0, pcAtual);
                  adicionarMenor = false;
                } else if (pcAtual.alertasAmar >= computadoresAmar[v + 1].alertasAmar) {
                  computadoresAmar.splice((v + 1), 0, pcAtual);
                  adicionarMenor = false;
                }
              }
            }
          }
        }
        adicionado = true;
      }
    }

    if (pcAtual.alertasAmar == 0 && pcAtual.alertasVerm == 0) {
      computadoresVerd.push(pcAtual);
      adicionado = true;
    }
    
  }

  // PRINT DOS VETORES DE JASON REFERENTES A CADA COR

  console.log("PC VERMELHOS: ", JSON.stringify(computadoresVerm));
  console.log("PC AMARELO: ", JSON.stringify(computadoresAmar));
  console.log("PC VERDE: ", JSON.stringify(computadoresVerd));

  // JUNÇÃO DOS VETORES EM UM SÓ PARA PLOT NO GRÁFICO

  var pcOrdenado = computadoresVerm.concat(computadoresAmar, computadoresVerd);

  console.log("PC VERDE: ", JSON.stringify(pcOrdenado));
  pcOrdenadoGlobal = pcOrdenado;
  criarCards(indicePaginaAtual, pcOrdenado);
}

var atualPagina = 1;

function criarCards(indiceInicial, pcOrdenado) {
  pcDivId.innerHTML = '';

  const pai = document.querySelector('.pc-container');

  // Define a quantidade de divs que você deseja criar
  const quantidadePcs = pcOrdenado.length;

  // Loop for para criar as novas divs
  for (let i = indiceInicial; i < quantidadePcs && i < (indiceInicial + pcPorPagina); i++) {
    // Cria uma nova div com a classe "pcIndiv"
    const novaDiv = document.createElement('div');
    novaDiv.classList.add('pcIndiv');

    novaDiv.id = `pc${i}`;
    novaDiv.addEventListener('click', function () {
      pcIndiv_window(this);
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
    p1.innerHTML = '<b>Setor:</b> ' + pcOrdenado[i].setor;
    const p2 = document.createElement('p');
    p2.innerHTML = '<b>HOSTNAME:</b> ' + pcOrdenado[i].hostname;
    // p2.textContent = 'HOSTNAME: ' + pcOrdenado[i].hostname;
    const p3 = document.createElement('p');
    p3.innerHTML = '<b>MAC: </b>' + pcOrdenado[i].mac;
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

    if (pcOrdenado[i].aRede != 0) {
      divRede.style.backgroundColor = 'yellow'
    } else if (pcOrdenado[i].vRede != 0) {
      divRede.style.backgroundColor = 'red'
    } else {
      divRede.style.backgroundColor = 'green'
    }

    if (pcOrdenado[i].aRam != 0) {
      divRam.style.backgroundColor = 'yellow'
    } else if (pcOrdenado[i].vRam != 0) {
      divRam.style.backgroundColor = 'red'
    } else {
      divRam.style.backgroundColor = 'green'
    }

    if (pcOrdenado[i].aCpu != 0) {
      divCpu.style.backgroundColor = 'yellow'
    } else if (pcOrdenado[i].vCpu != 0) {
      divCpu.style.backgroundColor = 'red'
    } else {
      divCpu.style.backgroundColor = 'green'
    }

    if (pcOrdenado[i].aDisco != 0) {
      divDisco.style.backgroundColor = 'yellow'
    } else if (pcOrdenado[i].vDisco != 0) {
      divDisco.style.backgroundColor = 'red'
    } else {
      divDisco.style.backgroundColor = 'green'
    }

    // Adiciona as quatro divs filhas a segunda div filha da novaDiv
    divStatus.appendChild(divRede);
    divStatus.appendChild(divRam);
    divStatus.appendChild(divCpu);
    divStatus.appendChild(divDisco);
    novaDiv.appendChild(divStatus);

    // Adiciona a novaDiv ao elemento pai
    pai.appendChild(novaDiv);
  }

  var numeroPaginas = Math.ceil(pcOrdenadoGlobal.length / 15);
  totalPaginas.innerHTML = numeroPaginas;

  paginaAtual.innerHTML = atualPagina;
}

function proxPag() {
  paginaAtual.innerHTML = atualPagina++;

  indicePaginaAtual += pcPorPagina;
  if (indicePaginaAtual >= pcOrdenadoGlobal.length) {
    indicePaginaAtual -= pcPorPagina;
  }

  if (pcOrdenadoGlobal.length - indicePaginaAtual <= 15) {
    direitaSeta.style.visibility = "hidden";
  }

  esquerdaSeta.style.visibility = "visible";
  criarCards(indicePaginaAtual, pcOrdenadoGlobal);
}

function antigPag() {
  paginaAtual.innerHTML = atualPagina--;

  direitaSeta.style.visibility = "visible";
  indicePaginaAtual -= pcPorPagina;
  if (indicePaginaAtual <= 0) {
    indicePaginaAtual = 0;
    esquerdaSeta.style.visibility = "hidden";
  }
  criarCards(indicePaginaAtual, pcOrdenadoGlobal);
}


function gerenciar_window() {
  window.location = "../html/computadores_gerenciar.html";
}
function reiniciar_window() {
  window.location = "../html/computadores_reinicio.html";
}

function pcIndiv_window(elementoDiv) {
  var terceiroPContent = elementoDiv.querySelector('.textoBox p:nth-child(2)').textContent;
  var hostname = terceiroPContent.split(':')[1].trim();
  sessionStorage.COMPUTADOR = hostname;
  window.location = "../html/computadorIndividual.html";
}
