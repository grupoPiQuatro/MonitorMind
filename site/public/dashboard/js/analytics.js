window.addEventListener("load", function () {
    TrazerDados();
    ComputadoresTotais();
    semRespostaPing();
    reinicioMaiorQueUm();
    riscoPreenchimento();
    alertaPorComponente();
    percentPcReinicio();
    tempoStatus();
  });

var totalComputador = 0;
function ComputadoresTotais(){
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

function TrazerDados(){
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

function semRespostaPing(){
    var fkEmpresa = sessionStorage.FK_EMPRESA;
    var resultadoGraficoCpu
    fetch(`/avisos/semRespostaPing/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
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

function reinicioMaiorQueUm(){
    var fkEmpresa = sessionStorage.FK_EMPRESA;
    var resultadoGraficoCpu
    fetch(`/avisos/reinicioMaiorQueUm/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
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

function riscoPreenchimento(){
    var fkEmpresa = sessionStorage.FK_EMPRESA;
    var resultadoGraficoCpu
    fetch(`/avisos/riscoPreenchimento/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
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

function alertaPorComponente(){
    var fkEmpresa = sessionStorage.FK_EMPRESA;
    var resultadoGraficoCpu
    fetch(`/avisos/alertaPorComponente/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
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

function percentPcReinicio(){
    var fkEmpresa = sessionStorage.FK_EMPRESA;
    var resultadoGraficoCpu
    fetch(`/avisos/percentPcReinicio/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
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

function tempoStatus(){
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

























const line = document.getElementById('lineChart');

new Chart(line, {
    type: 'line',
    data: {
        labels: ['SEGUNDA','TERÇA','QUARTA','QUINTA','SEXTA','SABADO','DOMINGO'],
        datasets: [{
            label: 'dasdas',
            data: [10, 17, 14, 19, 20, 25, 13],
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

const bar = document.getElementById('barChart');

new Chart(bar, {
    type: 'bar',
    data: {
        labels: ['RAM', 'CPU', 'Rede', 'Memória'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 70, 53, 54],
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

const pie = document.getElementById('pieChart');

new Chart(pie, {
    type: 'doughnut',
    data: {
        labels: ['Operado', 'Manutenção', 'Inativa'],
        datasets: [{
            label: '# of Votes',
            data: [80, 13 ,7],
            borderWidth: 2,
            cutout: '60%',
        }]
    },
    options: {
    }
});
