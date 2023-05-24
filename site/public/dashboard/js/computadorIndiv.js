window.addEventListener("load", function () {
    pegarComponentes();
    graficoRede();
});

var hostname = sessionStorage.COMPUTADOR;

function pegarComponentes() {
    
    fetch(`/pc/pegarComp/${hostname}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("STATUS: ", JSON.stringify(resposta));
                
                graficoRam();
                graficoCpu();
                graficoDisco();
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
                console.log("STATUS: ", JSON.stringify(resposta));
                resposta.reverse();
                plotarGrafico(resposta);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}

function plotarGrafico(resposta) {
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

    setTimeout(() => atualizarGraficoRede(dados, rede), 2000);
}





const ram = document.getElementById('ramChart');

new Chart(ram, {
    type: 'line',
    data: {
        labels: ['12:02', '12:04', '12:06', '12:08', '12:10', '12:12', '12:14', '12:16', '12:18',
            '12:20', '12:20', '12:20', '12:20', '12:20', '12:20',],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 70, 53, 54, 35, 52, 81, 93, 40, 30, 40, 40, 30, 25, 28],
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

const cpu = document.getElementById('cpuChart');

new Chart(cpu, {
    type: 'line',
    data: {
        labels: ['12:02', '12:04', '12:06', '12:08', '12:10', '12:12', '12:14', '12:16', '12:18',
            '12:20', '12:20', '12:20', '12:20', '12:20', '12:20',],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 39, 69, 90, 87, 75, 21, 3, 40, 30, 10, 40, 30, 25, 28],
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

const disco = document.getElementById('discoChart');

new Chart(disco, {
    type: 'doughnut',
    data: {
        labels: ['Uso', 'Disponível'],
        datasets: [{
            label: '# of Votes',
            data: [80, 20],
            borderWidth: 2,
            cutout: '60%',
        }]
    },
    options: {
    }
});

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