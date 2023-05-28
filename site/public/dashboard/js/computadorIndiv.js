window.addEventListener("load", function () {
    pegarComponentes();
    buscarParametro();
    graficoRede();
});

function buscarParametro() {
    fkEmpresa = sessionStorage.FK_EMPRESA;
  
    fetch(`/pc/buscarParametro/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
      if (resposta.ok) {
  
        resposta.json().then(function (resposta) {
          console.log("PARAMETROS: ", JSON.stringify(resposta));
          amarRede.innerHTML = resposta[0].valor;
          amarRam.innerHTML = resposta[1].valor;
          amarCpu.innerHTML = resposta[2].valor;
          amarDisco.innerHTML = resposta[3].valor;

          vermRede.innerHTML = resposta[4].valor;
          vermRam.innerHTML = resposta[5].valor;
          vermCpu.innerHTML = resposta[6].valor;
          vermDisco.innerHTML = resposta[7].valor;

          verdeRede.innerHTML = resposta[0].valor;
          verdeRam.innerHTML = resposta[1].valor;
          verdeCpu.innerHTML = resposta[2].valor;
          verdeDisco.innerHTML = resposta[3].valor;
        });
      } else {
        throw ('Houve um erro na API!');
      }
    }).catch(function (resposta) {
      console.error(resposta);
  
    });
  }

var hostname = sessionStorage.COMPUTADOR;

function pegarComponentes() {

    fetch(`/pc/pegarComp/${hostname}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("COMPONENTES: ", JSON.stringify(resposta));

                hostnameCampo.innerHTML = `HOSTNAME: ${hostname}`;
                
                setorCampo.innerHTML = `SETOR: ${resposta[0].setor}`;
                
                macCampo.innerHTML = `MAC: ${resposta[0].mac}`;
                 

                for (let i = 0; i < resposta.length; i++) {
                    var configDaVez = resposta[i];

                    if (configDaVez.fkTipo == 2) {
                        var idRam = configDaVez.idConfig;
                        ramCampo.innerHTML = `RAM: ${configDaVez.numeroChave}`;
                    }

                    if (configDaVez.fkTipo == 3) {
                        var idCpu = configDaVez.idConfig;
                        cpuCampo.innerHTML = `CPU: ${configDaVez.numeroChave}`;
                    }

                    if (configDaVez.fkTipo == 4) {
                        var idDisco = configDaVez.idConfig;
                        var capacidade = configDaVez.numeroChave;
                        discoCampo.innerHTML = `DISCO: ${configDaVez.numeroChave}`;
                    }

                    if (configDaVez.fkTipo == 5) {
                        var idDisco = configDaVez.idConfig;
                        var capacidade = configDaVez.numeroChave;
                        discoCampo.innerHTML = `DISCO: ${configDaVez.numeroChave}`;
                    }
                }

                graficoRam(idRam);
                graficoCpu(idCpu);
                graficoDisco(idDisco, capacidade);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}

function graficoRede() {
    fetch(`/pc/dadosRede/${hostname}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("DADOS REDE: ", JSON.stringify(resposta));
                resposta.reverse();
                plotarGraficoRede(resposta);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}

function plotarGraficoRede(resposta) {
    const labelsLine = []
    const dados = [];

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labelsLine.push(registro.momento);
        dados.push(registro.valor);
    }

    const rede = document.getElementById('redeChart');

    new Chart(rede, {
        type: 'line',
        data: {
            labels: labelsLine,
            datasets: [{
                label: 'Ping',
                data: dados,
                borderWidth: 4,
                fill: true,
                tension: 0.4,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black',
                    },
                    grid: {
                        color: 'black',
                    },

                },
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black',
                    },
                    grid: {
                        color: 'white',
                    },
                }
            },
        }
    });

    // setTimeout(() => atualizarGraficoRede(dados, rede), 2000);
}

function graficoRam(idRam) {
    fetch(`/pc/dadosRam/${hostname}/${idRam}`, { cache: 'no-store' }).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("DADOS RAM: ", JSON.stringify(resposta));
                resposta.reverse();
                plotarGraficoRam(resposta);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}

function plotarGraficoRam(resposta) {
    const labelsLine = []
    const dados = [];

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labelsLine.push(registro.momento);
        dados.push(registro.valor);
    }

    const ram = document.getElementById('ramChart');

    new Chart(ram, {
        type: 'line',
        data: {
            labels: labelsLine,
            datasets: [{
                label: 'Uso da RAM',
                data: dados,
                borderWidth: 4,
                fill: true,
                tension: 0.4,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black',
                    },
                    grid: {
                        color: 'black',
                    },

                },
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black',
                    },
                    grid: {
                        color: 'white',
                    },
                }
            },
        }
    });

    // setTimeout(() => atualizarGraficoRede(dados, rede), 2000);
}

// CPU GRAFICO

function graficoCpu(idCpu) {
    fetch(`/pc/dadosRam/${hostname}/${idCpu}`, { cache: 'no-store' }).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("DADOS CPU: ", JSON.stringify(resposta));
                resposta.reverse();
                plotarGraficoCpu(resposta);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}

function plotarGraficoCpu(resposta) {
    const labelsLine = []
    const dados = [];

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labelsLine.push(registro.momento);
        dados.push(registro.valor);
    }

    const cpu = document.getElementById('cpuChart');

    new Chart(cpu, {
        type: 'line',
        data: {
            labels: labelsLine,
            datasets: [{
                label: '# of Votes',
                data: dados,
                borderWidth: 4,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black',
                    },
                    grid: {
                        color: 'black',
                    },
                },
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black',
                    },
                    grid: {
                        color: 'white',
                    },
                }
            }
        }
    });

    // setTimeout(() => atualizarGraficoRede(dados, rede), 2000);
}


// DISCO GRAFICO

function graficoDisco(idDisco, capacidade) {
    fetch(`/pc/dadosDisco/${hostname}/${idDisco}`, { cache: 'no-store' }).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("DADOS DISCO: ", JSON.stringify(resposta));
                
                plotarGraficoDisco(resposta, capacidade);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}

function plotarGraficoDisco(resposta, capacidade) {
    const disco = document.getElementById('discoChart');
    
    var uso = resposta[0].valor;
    var disponivel = capacidade - uso; 
    var porcenUso = (uso * 100) / capacidade
    porcenUsoDisco.innerHTML = `${porcenUso.toFixed(1)}%`;

    new Chart(disco, {
        type: 'doughnut',
        data: {
            labels: ['Uso', 'Disponível'],
            datasets: [{
                label: '# of Votes',
                data: [uso, disponivel],
                borderWidth: 2,
                cutout: '50%',
            }]
        },
        options: {
        }
    });

    // setTimeout(() => atualizarGraficoRede(dados, rede), 2000);
}



// function mostrarLegendaRam() {
//     document.getElementById("ramLegenda").style.display = "flex";
// }

// function esconderLegendaRam() {
//     document.getElementById("ramLegenda").style.display = "none";
// }

function modal2() {

}

function modal3() {

}

function modal4() {

}