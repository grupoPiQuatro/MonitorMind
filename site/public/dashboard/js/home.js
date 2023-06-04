window.addEventListener("load", function () {
    buscarParametro();
    graficoStatus();
    buscarPcSemRetorno();
});

var vermRedeParam;
var amarRedeParam;
var vermRamParam;
var amarRamParam;
var vermCpuParam;
var amarCpuParam;
var vermDiscoParam;
var amarDiscoParam;


function buscarParametro() {
    fkEmpresa = sessionStorage.FK_EMPRESA;

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
    ParametroRedeV.innerHTML = vermRedeParam;
    ParametroRedeA.innerHTML = amarRedeParam;
    ParametroRamV.innerHTML = vermRamParam;
    ParametroRamA.innerHTML = amarRamParam;
    ParametroCpuV.innerHTML = vermCpuParam;
    ParametroCpuA.innerHTML = amarCpuParam;
    ParametroDiscoV.innerHTML = vermDiscoParam;
    ParametroDiscoA.innerHTML = amarDiscoParam;

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
                maquinas_monitoradas_agora.innerHTML = (resposta.length / 4);

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
        pcAtual = computadores[i];

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
        }


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
        }

        if (pcAtual.alertasAmar == 0 && pcAtual.alertasVerm == 0) {
            computadoresVerd.push(pcAtual);
        }

    }

    // PRINT DOS VETORES DE JASON REFERENTES A CADA COR

    console.log("PC VERMELHOS: ", JSON.stringify(computadoresVerm));
    console.log("PC AMARELO: ", JSON.stringify(computadoresAmar));
    console.log("PC VERDE: ", JSON.stringify(computadoresVerd));

    // JUNÇÃO DOS VETORES EM UM SÓ PARA PLOT NO GRÁFICO

    var pcOrdenado = computadoresVerm.concat(computadoresAmar, computadoresVerd);

    console.log("PC ORGANIZADOS POR COR: ", JSON.stringify(pcOrdenado));
    pcOrdenadoGlobal = pcOrdenado;
    separarAlertas();
}

function separarAlertas() {
    pcRedeVerm = 0;
    pcRedeAmar = 0;
    pcRamVerm = 0;
    pcRamAmar = 0;
    pcCpuVerm = 0;
    pcCpuAmar = 0;
    pcDiscoVerm = 0;
    pcDiscoAmar = 0;
    pcComDoisVerm = 0;

    for (i = 0; i < pcOrdenadoGlobal.length; i++) {
        pcAtual = pcOrdenadoGlobal[i];
        pcComDoisAlertVerm = 0;

        if (pcAtual.vRede > 0) {
            pcRedeVerm++;
            pcComDoisAlertVerm++;
        } else if (pcAtual.aRede > 0) {
            pcRedeAmar++;
        }

        if (pcAtual.vRam > 0) {
            pcRamVerm++;
            pcComDoisAlertVerm++;
        } else if (pcAtual.aRam > 0) {
            pcRamAmar++;
        }

        if (pcAtual.vCpu > 0) {
            pcCpuVerm++;
            pcComDoisAlertVerm++;
        } else if (pcAtual.aCpu > 0) {
            pcCpuAmar++;
        }

        if (pcAtual.vDisco > 0) {
            pcDiscoVerm++;
            pcComDoisAlertVerm++;
        } else if (pcAtual.aDisco > 0) {
            pcDiscoAmar++;
        }

        if (pcComDoisAlertVerm > 2) {
            pcComDoisVerm++;
        }

    }

    rede_vermelho.innerHTML = pcRedeVerm;
    rede_amarelo.innerHTML = pcRedeAmar;
    memoria_vermelho.innerHTML = pcRamVerm;
    memoria_amarelo.innerHTML = pcRamAmar;
    cpu_vermelho.innerHTML = pcCpuVerm;
    cpu_amarelo.innerHTML = pcCpuAmar;
    disco_vermelho.innerHTML = pcDiscoVerm;
    disco_amarelo.innerHTML = pcDiscoAmar;
    vka1.innerHTML = pcComDoisVerm;
}

function graficoStatus() {
    fkEmpresa = sessionStorage.FK_EMPRESA;
    fkEmpresa = 1;

    fetch(`/pc/buscarStatus/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("STATUS: ", JSON.stringify(resposta));
                
                separarStatus(resposta);
                
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}

function separarStatus(resposta) {
    var operando = 0;
    var manutencao = 0;
    var interrompido = 0;

    for (var i = 0; i < resposta.length; i++) {
        pcDaVez = resposta[i];

        if (pcDaVez.status == 'Operando') {
            operando++;
        } else if (pcDaVez.status == 'Manutenção') {
            manutencao++;
        } else if (pcDaVez.status == 'Interrompido') {
            interrompido++;
        }
    }

    const disco = document.getElementById('grafico');

    new Chart(disco, {
        type: 'doughnut',
        data: {
            datasets: [{
                label: 'Quantidade de computadores',
                data: [operando, interrompido, manutencao],
                borderWidth: 2,
                cutout: '0%',
            }]
        }
    });
}


function buscarPcSemRetorno() {
    fkEmpresa = sessionStorage.FK_EMPRESA;
    // fkEmpresa = 1;

    fetch(`/pc/buscarPcSemRetorno/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("STATUS: ", JSON.stringify(resposta));
                vka2.innerHTML = resposta[0][""];
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}


var temaClaro = true;
function trocarTema() {
    let body = document.querySelector("body")
    let temaImg = document.getElementById("tema")
    let logo = document.getElementById("logoImagem")
    let caixa1 = document.getElementById("caixa1");
    let caixa2 = document.getElementById("caixa2");
    let caixa3 = document.getElementById("caixa3");
    let caixa4 = document.getElementById("caixa4");
    let caixa5 = document.getElementById("caixa5");

    let text1 = document.getElementById("text-geral1");
    let text2 = document.getElementById("text-geral2");
    let text3 = document.getElementById("text-geral3");
    let text4 = document.getElementById("text-geral4");
    let text5 = document.getElementById("text-geral5");
    let text6 = document.getElementById("text-geral6");
    let text7 = document.getElementById("text-geral7");
    let text8 = document.getElementById("text-geral8");
    let text9 = document.getElementById("text-geral9");
    let text10 = document.getElementById("text-geral10");
    let text11 = document.getElementById("text-geral11");
    let text12 = document.getElementById("nome_empresa");
    let text13 = document.getElementById("text-geral13");
    let text14 = document.getElementById("text-geral14");
    let text15 = document.getElementById("text-geral15");
    let text16 = document.getElementById("text-geral16");

    let textV1 = document.getElementById("rede_vermelho");
    let textV2 = document.getElementById("rede_amarelo");
    let textV3 = document.getElementById("disco_vermelho");
    let textV4 = document.getElementById("disco_amarelo");
    let textV5 = document.getElementById("cpu_vermelho");
    let textV6 = document.getElementById("cpu_amarelo");
    let textV7 = document.getElementById("memoria_vermelho");
    let textV8 = document.getElementById("memoria_amarelo");

    let iconPc = document.getElementById("icone-pc");
    let iconAlerta = document.getElementById("icone-alerta");

    let textA1 = document.getElementById("vka1");
    let textA2 = document.getElementById("vka2");

    let textT = document.getElementById("titulo")
    let box = document.getElementById("box")

    if (temaClaro) {
        logo.src = "../assets/home/logoEscura.png";
        temaImg.src = "../../assets/icon-lua.png";
        iconPc.src = "../assets/home/trabalho-em-progresso.png";
        iconAlerta.src = "../assets/home/alerta.png";
        body.style.backgroundColor = "#FFF";
        caixa1.style.backgroundColor = "#D3D3D3";
        caixa2.style.backgroundColor = "#D3D3D3";
        caixa3.style.backgroundColor = "#D3D3D3";
        caixa4.style.backgroundColor = "#D3D3D3";
        caixa5.style.backgroundColor = "#D3D3D3";

        text1.style.color = "#000";
        text2.style.color = "#000";
        text3.style.color = "#000";
        text4.style.color = "#000";
        text5.style.color = "#000";
        text6.style.color = "#000";
        text7.style.color = "#000";
        text8.style.color = "#000";
        text9.style.color = "#000";
        text10.style.color = "#000";
        text11.style.color = "#000";
        text12.style.color = "#000";
        text13.style.color = "#4eabe9";
        text14.style.color = "#000";
        text15.style.color = "#000";
        text16.style.color = "#000";

        textV1.style.color = "#000";
        textV2.style.color = "#000";
        textV3.style.color = "#000";
        textV4.style.color = "#000";
        textV5.style.color = "#000";
        textV6.style.color = "#000";
        textV7.style.color = "#000";
        textV8.style.color = "#000";

        textA1.style.color = "#000";
        textA2.style.color = "#000";

        textT.style.color = "#000";
        temaClaro = false;
    } else {
        logo.src = "../assets/home/logoClara.png"
        temaImg.src = "../../assets/icon-sol.png"
        iconPc.src = "../assets/home/trabalho-em-progresso-branco.png"
        iconAlerta.src = "../assets/home/alerta-branco.png"
        body.style.backgroundColor = "#1a1a1a";
        caixa1.style.backgroundColor = "#2C2B2B";
        caixa2.style.backgroundColor = "#2C2B2B";
        caixa3.style.backgroundColor = "#2C2B2B";
        caixa4.style.backgroundColor = "#2C2B2B";
        caixa5.style.backgroundColor = "#2C2B2B";

        text1.style.color = "#FFF";
        text2.style.color = "#FFF";
        text3.style.color = "#FFF";
        text4.style.color = "#FFF";
        text5.style.color = "#FFF";
        text6.style.color = "#FFF";
        text7.style.color = "#FFF";
        text8.style.color = "#FFF";
        text9.style.color = "#FFF";
        text10.style.color = "#FFF";
        text11.style.color = "#FFF";
        text12.style.color = "#FFF";
        text13.style.color = "#4eabe9";
        text14.style.color = "#FFF";
        text15.style.color = "#FFF";
        text16.style.color = "#FFF";

        textV1.style.color = "#FFF";
        textV2.style.color = "#FFF";
        textV3.style.color = "#FFF";
        textV4.style.color = "#FFF";
        textV5.style.color = "#FFF";
        textV6.style.color = "#FFF";
        textV7.style.color = "#FFF";
        textV8.style.color = "#FFF";

        textA1.style.color = "#FFF";
        textA2.style.color = "#FFF";

        textT.style.color = "#FFF";
        temaClaro = true;
    }
}