window.addEventListener("load", function () {
  TrazerDados();
  ComputadoresTotais();
  semRespostaPing();
  reinicioMaiorQueUm();
  riscoPreenchimento();
  alertaPorComponente();
  percentPcReinicio();
  tempoStatus();
  graficoPizza()
});

var totalComputador = 0;
function ComputadoresTotais() {
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  fetch(`/avisos/comptotal/${fkEmpresa}`, { cache: 'no-store' }).then(function (respostaaa) {
    if (respostaaa.ok) {

      respostaaa.json().then(function (respostaaa) {
        console.log("Resposta Grafico: ", JSON.stringify(respostaaa));
        totalComputador = respostaaa[0].total


      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (respostaaa) {
    console.error(respostaaa);

  });
}

function TrazerDados() {
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  var resultadoGraficoCpu
  fetch(`/avisos/puxar/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
    if (resposta.ok) {

      resposta.json().then(function (resposta) {
        console.log("Resposta Grafico: ", JSON.stringify(resposta));
        resultadoGraficoCpu = resposta[0].total_linhas
        var sla = (Number(resultadoGraficoCpu) / (Number(totalComputador)) * 100);
        respostaCPU.innerHTML = sla.toFixed(0) + "%";

      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);

  });
}

function semRespostaPing() {
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  var resultadoGraficoCpu
  fetch(`/avisos/semRespostaPing/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
    if (resposta.ok) {

      resposta.json().then(function (resposta) {
        console.log("Resposta Grafico: ", JSON.stringify(resposta));
        var mediaPing = resposta[0].mediaPing
        ping.innerHTML = mediaPing.toFixed(0) + " ms"

      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);

  });
}

function reinicioMaiorQueUm() {
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  var resultadoGraficoCpu
  fetch(`/avisos/reinicioMaiorQueUm/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
    if (resposta.ok) {

      resposta.json().then(function (resposta) {
        console.log("Resposta Grafico: ", JSON.stringify(resposta));
        var reinicioMaiorQueUm = resposta[0].qtdReinicio
        reinicio.innerHTML = reinicioMaiorQueUm + '%'

      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);

  });
}

function riscoPreenchimento() {
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  var resultadoGraficoCpu
  fetch(`/avisos/riscoPreenchimento/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
    if (resposta.ok) {

      resposta.json().then(function (resposta) {
        console.log("Resposta Grafico: ", JSON.stringify(resposta));
        var riscoPreenchimento = resposta[0].qtdComputadores
        riscoPreenchimentoo.innerHTML = riscoPreenchimento + '%'

      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);

  });
}

function alertaPorComponente() {
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  var resultadoGraficoCpu
  fetch(`/avisos/alertaPorComponente/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
    if (resposta.ok) {

      resposta.json().then(function (resposta) {
        console.log("Resposta Grafico: ", JSON.stringify(resposta));
        var cpu = 0;
        var rede = 0;
        var ram = 0;
        var disco = 0;
        var dados = []
        for (let i = 0; i < resposta.length; i++) {
          if (resposta[i].Nome == 'rede') {
            rede += resposta[i].qtdAlerta
          }
          if (resposta[i].Nome == 'ram') {
            ram += resposta[i].qtdAlerta
          }
          if (resposta[i].Nome == 'hd' || resposta[i].nome == 'ssd') {
            disco += resposta[i].qtdAlerta
          }
          if (resposta[i].Nome == 'cpu') {
            cpu += resposta[i].qtdAlerta
          }

        }
        dados.push(rede)
        dados.push(ram)
        dados.push(cpu)
        dados.push(disco)
        graficoBarra(dados)

      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);

  });
}

function percentPcReinicio() {
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  var resultadoGraficoCpu
  fetch(`/avisos/percentPcReinicio/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
    if (resposta.ok) {

      resposta.json().then(function (resposta) {
        console.log("Resposta Grafico: ", JSON.stringify(resposta));

        var dadosReinicio = [];


        dadosReinicio.push(resposta[0].conta)
        dadosReinicio.push(2)
        dadosReinicio.push(2)
        dadosReinicio.push(2)
        dadosReinicio.push(2)
        dadosReinicio.push(2)
        dadosReinicio.push(2)
        // dadosReinicio.push(resposta[2].conta)
        // dadosReinicio.push(resposta[3].conta)
        // dadosReinicio.push(resposta[4].conta)
        // dadosReinicio.push(resposta[5].conta)
        // dadosReinicio.push(resposta[6].conta)

        dataReinicio(dadosReinicio);


      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);

  });
}

function tempoStatus() {
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  var resultadoGraficoCpu
  fetch(`/avisos/tempoStatus/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
    if (resposta.ok) {

      resposta.json().then(function (resposta) {
        console.log("Resposta Grafico: ", JSON.stringify(resposta));


      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);

  });
}




function dataReinicio(dadosReinicio) {
  const line = document.getElementById('lineChart');

  new Chart(line, {
    type: 'line',
    data: {
      labels: ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO'],
      datasets: [{
        label: 'dasdas',
        data: dadosReinicio,
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
}
function graficoBarra(dados) {
  const bar = document.getElementById('barChart');

  new Chart(bar, {
    type: 'bar',
    data: {
      labels: ['REDE', 'CPU', 'RAM', 'DISCO'],
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
          }
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
}

function graficoPizza() {
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  
  fetch(`/maquina/buscarSetores/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
    if (resposta.ok) {

      resposta.json().then(function (resposta) {
        console.log("Resposta Grafico: ", JSON.stringify(resposta));

        var labels = [];
        var dados = [];

        for (let i = 0; i < resposta.length; i++) {
          var registro = resposta[i];

          labels.push(registro.setor);
          dados.push(registro.quantidade);

        }

        plotarPizza(labels, dados);

      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);

  });

}


function plotarPizza(labelss, dados) {
  const pie = document.getElementById('pieChart');

  new Chart(pie, {
    type: 'doughnut',
    data: {
      labels: labelss,
      datasets: [{
        label: '',
        data: dados,
        borderWidth: 2,
        cutout: '60%',
      }]
    },
    options: {
    }
  });

}

