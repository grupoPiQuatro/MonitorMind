window.addEventListener("load", function () {
    pegarComponentes();
    buscarParametro();
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
var idRam = null;
var idCpu = null;
var idDisco = null;
var porcenUso = null;

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
                        idRam = configDaVez.idConfig;
                        ramCampo.innerHTML = `RAM: ${configDaVez.numeroChave}`;
                    }

                    if (configDaVez.fkTipo == 3) {
                        idCpu = configDaVez.idConfig;
                        cpuCampo.innerHTML = `CPU: ${configDaVez.numeroChave}`;
                    }

                    if (configDaVez.fkTipo == 4) {
                        idDisco = configDaVez.idConfig;
                        var capacidade = configDaVez.numeroChave;
                        discoCampo.innerHTML = `DISCO: ${configDaVez.numeroChave}`;
                    }

                    if (configDaVez.fkTipo == 5) {
                        idDisco = configDaVez.idConfig;
                        var capacidade = configDaVez.numeroChave;
                        discoCampo.innerHTML = `DISCO: ${configDaVez.numeroChave}`;
                    }
                }

                graficoRede();
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

    var alerta = resposta[resposta.length - 1].valor;
    var imagemAlerta = document.getElementById("alertaRede");
    var alertaVerm = Number(document.getElementById("vermRede").innerText);
    var alertaAmar = Number(document.getElementById("amarRede").innerText);

    if (alerta >= alertaVerm) {
        imagemAlerta.src = '../assets/dashboard/vermelho.png'
    } else if (alerta >= alertaAmar) {
        imagemAlerta.src = '../assets/dashboard/amarelo.png'
    } else {
        imagemAlerta.src = '../assets/dashboard/verde.png'
    }

    const rede = document.getElementById('redeChart');

    var chartRede = new Chart(rede, {
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

    setTimeout(() => atualizarGraficoRede(dados, labelsLine, chartRede), 2000);
}

let proximaAtualizacao;

function atualizarGraficoRede(dadosRede, dataRede, rede) {

    fetch(`/pc/atualizarRede/${hostname}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dadosRede);

                if (novoRegistro[0].momento == dataRede[dataRede.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].momento)
                    console.log("Horário do último dado capturado:")
                    console.log(dataRede[dataRede.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico

                    dataRede.shift(); // apagar o primeiro
                    dataRede.push(novoRegistro[0].momento); // incluir um novo momento

                    dadosRede.shift();  // apagar o primeiro de Temperatura
                    dadosRede.push(novoRegistro[0].valor); // incluir uma nova medida de Temperatura

                    var alerta = novoRegistro[0].valor;
                    var imagemAlerta = document.getElementById("alertaRede");
                    var alertaVerm = Number(document.getElementById("vermRede").innerText);
                    var alertaAmar = Number(document.getElementById("amarRede").innerText);

                    if (alerta >= alertaVerm) {
                        imagemAlerta.src = '../assets/dashboard/vermelho.png'
                    } else if (alerta >= alertaAmar) {
                        imagemAlerta.src = '../assets/dashboard/amarelo.png'
                    } else {
                        imagemAlerta.src = '../assets/dashboard/verde.png'
                    }

                    rede.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoRede(dadosRede, dataRede, rede), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoRede(dadosRede, dataRede, rede), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

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

    var alerta = resposta[resposta.length - 1].valor;
    var imagemAlerta = document.getElementById("alertaRam");
    var alertaVerm = Number(document.getElementById("vermRam").innerText);
    var alertaAmar = Number(document.getElementById("amarRam").innerText);

    if (alerta >= alertaVerm) {
        imagemAlerta.src = '../assets/dashboard/vermelho.png'
    } else if (alerta >= alertaAmar) {
        imagemAlerta.src = '../assets/dashboard/amarelo.png'
    } else {
        imagemAlerta.src = '../assets/dashboard/verde.png'
    }

    const ram = document.getElementById('ramChart');

    var chartRam = new Chart(ram, {
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

    setTimeout(() => atualizarGraficoRam(dados, labelsLine, chartRam), 2000);
}

let proximaAtualizacao2;

function atualizarGraficoRam(dados, data, ram) {

    fetch(`/pc/atualizarRam/${hostname}/${idRam}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos RAM: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico de RAM:`);
                console.log(dados);

                if (novoRegistro[0].momento == data[data.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].momento)
                    console.log("Horário do último dado capturado:")
                    console.log(data[data.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico

                    data.shift(); // apagar o primeiro
                    data.push(novoRegistro[0].momento); // incluir um novo momento

                    dados.shift();  // apagar o primeiro de Temperatura
                    dados.push(novoRegistro[0].valor); // incluir uma nova medida de Temperatura

                    var alerta = novoRegistro[0].valor;
                    var imagemAlerta = document.getElementById("alertaRam");
                    var alertaVerm = Number(document.getElementById("vermRam").innerText);
                    var alertaAmar = Number(document.getElementById("amarRam").innerText);

                    if (alerta >= alertaVerm) {
                        imagemAlerta.src = '../assets/dashboard/vermelho.png'
                    } else if (alerta >= alertaAmar) {
                        imagemAlerta.src = '../assets/dashboard/amarelo.png'
                    } else {
                        imagemAlerta.src = '../assets/dashboard/verde.png'
                    }

                    ram.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao2 = setTimeout(() => atualizarGraficoRam(dados, data, ram), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao2 = setTimeout(() => atualizarGraficoRam(dados, data, ram), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

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

    var alerta = resposta[resposta.length - 1].valor;
    var imagemAlerta = document.getElementById("alertaCpu");
    var alertaVerm = Number(document.getElementById("vermCpu").innerText);
    var alertaAmar = Number(document.getElementById("amarCpu").innerText);

    if (alerta >= alertaVerm) {
        imagemAlerta.src = '../assets/dashboard/vermelho.png'
    } else if (alerta >= alertaAmar) {
        imagemAlerta.src = '../assets/dashboard/amarelo.png'
    } else {
        imagemAlerta.src = '../assets/dashboard/verde.png'
    }

    const cpu = document.getElementById('cpuChart');

    var chartCpu = new Chart(cpu, {
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

    setTimeout(() => atualizarGraficoCpu(dados, labelsLine, chartCpu), 2000);
}

let proximaAtualizacao3;

function atualizarGraficoCpu(dados, data, cpu) {

    fetch(`/pc/atualizarCpu/${hostname}/${idCpu}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos RAM: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico de RAM:`);
                console.log(dados);

                if (novoRegistro[0].momento == data[data.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].momento)
                    console.log("Horário do último dado capturado:")
                    console.log(data[data.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico

                    data.shift(); // apagar o primeiro
                    data.push(novoRegistro[0].momento); // incluir um novo momento

                    dados.shift();  // apagar o primeiro de Temperatura
                    dados.push(novoRegistro[0].valor); // incluir uma nova medida de Temperatura

                    var alerta = novoRegistro[0].valor;
                    var imagemAlerta = document.getElementById("alertaCpu");
                    var alertaVerm = Number(document.getElementById("vermCpu").innerText);
                    var alertaAmar = Number(document.getElementById("amarCpu").innerText);

                    if (alerta >= alertaVerm) {
                        imagemAlerta.src = '../assets/dashboard/vermelho.png'
                    } else if (alerta >= alertaAmar) {
                        imagemAlerta.src = '../assets/dashboard/amarelo.png'
                    } else {
                        imagemAlerta.src = '../assets/dashboard/verde.png'
                    }

                    cpu.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao3 = setTimeout(() => atualizarGraficoCpu(dados, data, cpu), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao3 = setTimeout(() => atualizarGraficoCpu(dados, data, cpu), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

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
    porcenUsoDisco.innerHTML = `${uso.toFixed(1)}%`;

    var usoConvertido = (uso / 100) * capacidade;
    var disponivel = capacidade - usoConvertido;

    var alerta = resposta[resposta.length - 1].valor;
    var imagemAlerta = document.getElementById("alertaDisco");
    var alertaVerm = Number(document.getElementById("vermDisco").innerText);
    var alertaAmar = Number(document.getElementById("amarDisco").innerText);

    if (alerta >= alertaVerm) {
        imagemAlerta.src = '../assets/dashboard/vermelho.png'
    } else if (alerta >= alertaAmar) {
        imagemAlerta.src = '../assets/dashboard/amarelo.png'
    } else {
        imagemAlerta.src = '../assets/dashboard/verde.png'
    }

    var chart = new Chart(disco, {
        type: 'doughnut',
        data: {
            labels: ['Uso', 'Disponível'],
            datasets: [{
                label: '# of Votes',
                data: [usoConvertido, disponivel],
                borderWidth: 2,
                cutout: '50%',
            }]
        },
        options: {
        }
    });

    setTimeout(() => atualizarGraficoDisco(chart, uso, capacidade, disco), 2000);
}

let proximaAtualizacao4;

function atualizarGraficoDisco(chart, uso, capacidade, disco) {

    fetch(`/pc/atualizarDisco/${hostname}/${idDisco}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`NOVO USO DO DISCO: ${JSON.stringify(novoRegistro)}`);
                console.log(`USO ATUAL DO DISCO:`);
                console.log(uso);

                if (novoRegistro[0].valor == uso) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                    console.log("Novo dado capturado:")
                    console.log(novoRegistro[0].valor)
                    console.log("Último dado capturado:")
                    console.log(uso)
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico

                    var dadosDisco = chart.data.datasets[0].data;
                    dadosDisco.splice(0);
                    dadosDisco.push(novoRegistro[0].valor);
                    var disponivel = capacidade - novoRegistro[0].valor;
                    dadosDisco.push(disponivel);

                    var alerta = novoRegistro[0].valor;
                    var imagemAlerta = document.getElementById("alertaDisco");
                    var alertaVerm = Number(document.getElementById("vermDisco").innerText);
                    var alertaAmar = Number(document.getElementById("amarDisco").innerText);

                    if (alerta >= alertaVerm) {
                        imagemAlerta.src = '../assets/dashboard/vermelho.png'
                    } else if (alerta >= alertaAmar) {
                        imagemAlerta.src = '../assets/dashboard/amarelo.png'
                    } else {
                        imagemAlerta.src = '../assets/dashboard/verde.png'
                    }

                    chart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao4 = setTimeout(() => atualizarGraficoDisco(chart, uso, capacidade, disco), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao4 = setTimeout(() => atualizarGraficoDisco(chart, uso, capacidade, disco), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

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