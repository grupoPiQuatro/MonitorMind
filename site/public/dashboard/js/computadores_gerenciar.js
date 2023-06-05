// ADICIONAR

function adicionar_computador() {
    var modal = document.getElementById("modal_adicionar")

    modal.style.display = "block"
}

function cancelar() {
    let modal_add = document.getElementById("modal_adicionar")
    let modal_editar = document.getElementById("modal_editar")
    let erro1 = document.getElementById("label_erro1");
    let erro2 = document.getElementById("label_erro2");
    let erro3 = document.getElementById("label_erro3");
    let erro4 = document.getElementById("label_erro4");
    let erro5 = document.getElementById("label_erro5");
    let erro6 = document.getElementById("label_erro6");
    let erro7 = document.getElementById("label_erro7");
    let erro8 = document.getElementById("label_erro8");
    let erro9 = document.getElementById("label_erro9");
    let erro10 = document.getElementById("label_erro10");

    erro1.style.display = "none"
    erro2.style.display = "none"
    erro3.style.display = "none"
    erro4.style.display = "none"
    erro5.style.display = "none"
    erro6.style.display = "none"
    erro7.style.display = "none"
    erro8.style.display = "none"
    erro9.style.display = "none"
    erro10.style.display = "none"

    modal_add.style.display = "none"
    modal_editar.style.display = "none"
}

var compId = [];

function confirmar_adicionar_maquina() {
    let add_setor = document.getElementById("add_setor");
    let add_hostname = document.getElementById("add_hostname");
    let add_mac = document.getElementById("add_mac");
    let add_tipo = document.getElementById("add_tipo");
    let add_tamanho = document.getElementById("add_tamanho");
    let add_ram = document.getElementById("add_ram");
    let add_so = document.getElementById("add_so");
    let add_cpu = document.getElementById("add_cpu");

    verificaValoresAdd(add_setor, add_hostname, add_mac, add_tipo, add_ram, add_so, add_cpu, add_tamanho)

    var hostname = add_hostname.value
    var mac = add_mac.value;
    var setor = add_setor.value
    var tipoDisco = add_tipo.value
    var tamanhoArmaz = add_tamanho.value
    var tamanhoRam = add_ram.value
    var so = add_so.value
    var cpu = add_cpu.value
    var fkEmpresa = sessionStorage.FK_EMPRESA;

    var util = [];
    var inserir = false;

    if (validacao) {
        for (let i = 1; i <= 4; i++) {
            var nome = "";
            var numeroChave = "";
            
            if (i == 1) {
                nome = "rede";
                numeroChave = 1;
            }

            if (i == 2) {
                nome = "ram";
                numeroChave = tamanhoRam;
            }

            if (i == 3) {
                nome = "cpu";
                numeroChave = cpu;
            }

            if (i == 4) {
                nome = tipoDisco;
                numeroChave = tamanhoArmaz;
            }

            fetch(`/maquina/encontrarConfig2/${nome}/${numeroChave}`, {
            }).then(function (resposta) {
    
                if (resposta.ok) {
    
                    console.log("resposta config: ", resposta);
    
                    resposta.json().then(function (resposta) {
    
                        if (resposta.length <= 0) {
                            console.log("Vai inserir um componente!!!")
                            console.log("resposta: ", resposta);

                            
                            var comp = {
                                fkTipo : i,
                                numero : numeroChave
                            }
                            util.push(comp)
                            inserir = true;
                        } else {
                            console.log("Componente ja cadastrado!!!")
                            console.log("resposta: ", resposta);
                            
                            compId.push(resposta[0])
                            
                        }
                    });
                } else {
                    throw ("Houve um erro ao tentar encontrar config!");
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

            
        }

        if (inserir) {
            inserirComp2(util, setor, hostname, so, mac, fkEmpresa);
        } else {
            encontrarSetor2(setor, hostname, so, mac, fkEmpresa);
        }
    }
}


function inserirComp2(util, setor, hostname, so, mac, fkEmpresa) {
    alert(i)
  
    for (let i = 0; index < util.length; i++) {
        var numeroChave = util[i].numeroChave;
        var fkTipo = util[i].fkTipo;
        var unidadeMedida = "";

        if (fkTipo == 1) {
            unidadeMedida = "ms"
        } else if (fkTipo = 2) {
            unidadeMedida = "GB"
        } else if (fkTipo = 3) {
            unidadeMedida = "hz"
        } else if (fkTipo = 4) {
            unidadeMedida = "GB"
        }
        
        fetch(`/maquina/inserirComp2/${numeroChave}/${unidadeMedida}/${fkTipo}`, {
        }).then(function (resposta) {
    
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("resposta: ", resposta);
                    compId.push(resposta[0]);
                    alert("Inseriu" + fkTipo);
                });
            } else {
                throw ("Houve um erro ao tentar inserir config!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }

    encontrarSetor2(setor, hostname, so, mac, fkEmpresa);
}

function encontrarSetor2(setor, hostname, so, mac, fkEmpresa) {
    fetch(`/maquina/encontrarSetor/${setor}`, {
    }).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("resposta: ", resposta);
                
                cadastrarMaquina(resposta[0].idLocalizacao, hostname, so, mac, fkEmpresa)
                
            });
        } else {
            throw ("Houve um erro ao tentar encontar setor!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function cadastrarMaquina(fkSetor, hostname, so, mac, fkEmpresa) {
    console.log("TA AQUI O MAC FDP:" + mac)

    fetch(`/maquina/cadastrarMaquina`, {
        cache: 'no-store',
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            hostnameServer: hostname,
            soServer: so,
            macServer: mac,
            fkLocalizacaoServer: fkSetor,
            fkEmpresaServer: fkEmpresa
        })

    }).then(function (resposta) {
        if (resposta.ok) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));

            inserirConfiguracao(hostname)

        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });

}

function inserirConfiguracao(hostname){
    let modal = document.getElementById("modal_adicionar");

    for (let i = 0; i <= 3; i++) {
        fetch(`/maquina/cadastrarConfig`, {
            cache: 'no-store',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                hostnameServer: hostname,
                fkComponenteServer: compId[i].idComponente,
            })
    
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
    
                console.log('Cadastrado !!');
                modal.style.display = 'none';
    
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
    
        });   
    }
}

function verificaValoresAdd(add_setor, add_status, add_mac, add_tipo, add_ram, add_so, add_cpu, add_tamanho) {
    validacao = true;
    if (add_setor.value == "") {
        let erro1 = document.getElementById("label_erro1");
        erro1.style.display = "block"
        validacao = false;
    }

    if (add_status.value == "") {
        let erro2 = document.getElementById("label_erro2")
        erro2.style.display = "block"
        validacao = false;
    }

    if (add_mac.value == "") {
        let erro8 = document.getElementById("label_erro8")
        erro8.style.display = "block"
        validacao = false;
    }

    if (add_tipo.value == "") {
        let erro3 = document.getElementById("label_erro3")
        erro3.style.display = "block"
        validacao = false;
    }

    if (add_ram.value == "") {
        let erro4 = document.getElementById("label_erro4")
        erro4.style.display = "block"
        validacao = false;
    }
    if (add_so.value.length == 0) {
        let erro5 = document.getElementById("label_erro5")
        erro5.style.display = "block"
        validacao = false;
    }

    if (add_cpu.value.length == 0) {
        let erro6 = document.getElementById("label_erro6")
        erro6.style.display = "block"
        validacao = false;
    }

    if (add_tamanho.value.length == 0) {
        let erro7 = document.getElementById("label_erro7")
        erro7.style.display = "block"
        validacao = false;
    }

    return validacao
}


const ipt_num = document.getElementById("add_cpu");
ipt_num.addEventListener("input", () => {
    const maxLength = 3;
    if (ipt_num.value.length > maxLength) {
        ipt_num.value = ipt_num.value.slice(0, maxLength);
    }
    let valor = ipt_num.value.replace(/\D/g, '');
    if (valor.length > 1) {
        valor = valor.slice(0, -1) + '.' + valor.slice(-1);
        ipt_num.value = valor;
    }
});

function changed(text) {
    let erroEsconder = document.getElementById(text)
    erroEsconder.style.display = "none";
}


// Etapas do cadastro


function verificarComponentes() {



}




// EDITAR
var hostnameVar;
var edit_volumeVar;

function editar(setor, status, tipo, i, volume) {
    hostnameVar = document.getElementById(`hostname${i}`).textContent;
    var modal = document.getElementById("modal_editar")
    var edit_setor = document.getElementById("edit_setor");
    var edit_status = document.getElementById("edit_status");
    var edit_tipo = document.getElementById("edit_tipo");
    var edit_volume = document.getElementById("edit_volume");

    edit_setor.value = setor;
    edit_status.value = status;
    edit_tipo.value = tipo;
    edit_volume.value = volume;
    edit_volumeVar = volume;

    modal.style.display = "block";
}

function sleep(ms) {
    const startTime = Date.now();
    while (Date.now() - startTime < ms) { }
}

var response;
function confirmar_editar_maquina() {
    let modal = document.getElementById("modal_editar")
    let edit_setor = document.getElementById("edit_setor").value;
    let edit_status = document.getElementById("edit_status").value;
    let edit_tipo = document.getElementById("edit_tipo").value.toLowerCase();
    let edit_volume = document.getElementById("edit_volume").value;

    verificaValoresEditar(edit_setor, edit_status, edit_tipo, edit_volume)
    if (validacao) {
        encontrarSetor(edit_setor, edit_status, edit_tipo, edit_volume)

        // editarMaquina(idLocalizacao, edit_status, edit_tipo)

        modal.style.display = "none"
    } else {
        alert('Existem compos a serem preenchidos')
    }
}

function verificaValoresEditar(edit_setor, edit_status, edit_tipo, edit_volume) {
    validacao = true;
    if (edit_setor.value == "") {
        let erro7 = document.getElementById("label_erro7");
        erro7.style.display = "block"
        validacao = false;
    }

    if (edit_status.value == "") {
        let erro8 = document.getElementById("label_erro8")
        erro8.style.display = "block"
        validacao = false;
    }

    if (edit_tipo.value == "") {
        let erro9 = document.getElementById("label_erro9")
        erro9.style.display = "block"
        validacao = false;
    }

    if (edit_volume.value == "") {
        edit_volume.value = edit_volumeVar;
        validacao = false;
    }

    return validacao
}

function encontrarSetor(edit_setor, edit_status, edit_tipo, volume) {
    fetch(`/maquina/encontrarSetor/${edit_setor}`, {
    }).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("resposta: ", resposta);
                econtrarConfig(resposta[0].idLocalizacao, edit_status, edit_tipo, volume)
        } else {
            throw ("Houve um erro ao tentar encontar setor!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

function econtrarConfig(fkSetor, edit_status, edit_tipo, volume) {
    let tipoNome;
    if (Number(edit_tipo) == 4) {
        tipoNome = 'ssd'
    } else {
        tipoNome = 'hd'
    }
    fetch(`/maquina/encontrarConfig/${tipoNome}/${volume}`, {
    }).then(function (resposta) {

        if (resposta.ok) {

            console.log("resposta config: ", resposta);

            resposta.json().then(function (resposta) {

                if (resposta.length <= 0) {
                    console.log("Vai inserir um componente")
                    console.log("resposta: ", resposta);
                    inserirConfig(fkSetor, edit_status, edit_tipo, volume)
                } else {
                    console.log("Editando maquina")
                    console.log("resposta: ", resposta);
                    editarMaquina(fkSetor, edit_status, resposta[0].idComponente)
                }
            });
        } else {
            throw ("Houve um erro ao tentar encontrar config!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

function editarMaquina(fkSetor, edit_status, fkComponente) {
    var hostname = hostnameVar
    var fkSetorVar = fkSetor
    var statusVar = edit_status
    var fkComponenteVar = fkComponente

    fetch("/maquina/editarMaquina", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            hostnameServer: hostname,
            fkSetorServer: fkSetorVar,
            statusServer: statusVar,
            fkComponenteServer: fkComponenteVar,
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            console.log("resposta: ", resposta);
            sleep(2000)
            listarMaquina()
        } else {
            throw ("Houve um erro ao tentar editar maquina!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

function inserirConfig(fkSetor, edit_status, edit_tipo, volume) {
    fetch(`/maquina/inserirConfig/${edit_tipo}/${volume}`, {
    }).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("resposta: ", resposta);
                editarMaquina(fkSetor, edit_status, resposta[0].idComponente)
            });
        } else {
            throw ("Houve um erro ao tentar inserir config!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

// DELETAR

let indice;

function modal_deletar(i) {
    indice = i;
    var modal = document.getElementById("modal_delete")
    modal.style.display = "block"
}

function sair_deletar() {
    var modal = document.getElementById("modal_delete")
    modal.style.display = "none"
}

function confirmar_deletar_maquina() {
    hostnameDelete = document.getElementById(`hostname${indice}`).textContent;
    data.splice(indice, 1);
    deletarMaquina(hostnameDelete)
    listarMaquina()
    sair_deletar()
}

function deletarMaquina(hostnameDelete) {
    var hostnameVar = hostnameDelete

    fetch(`/maquina/deletarMaquina`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            hostnameDelete: hostnameVar,
        })

    }).then(function (resposta) {

        if (resposta.ok) {
            console.log("resposta: ", resposta);
            console.log(`Maquina com hostname ${hostnameDelete} deletada`)

        } else {
            throw ("Houve um erro ao tentar deletar maquina!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}


// Geração de tabela

function generateTable(resposta) {
    // console.log(`Resposta: ${resposta}`)

    const tableContainer = document.getElementById("tabela-computadores");

    tableContainer.innerHTML = "";

    for (let i = 0; i < resposta.length; i++) {
        const item = resposta[i];
        const row = document.createElement("div");
        row.classList.add("linha-tabela");

        const hostnameColumn = document.createElement("div");
        hostnameColumn.classList.add("info-item", "table");
        hostnameColumn.id = "hostname" + i;
        hostnameColumn.textContent = item.hostname;
        // console.log(hostnameColumn)
        row.appendChild(hostnameColumn);

        const setorColumn = document.createElement("div");
        setorColumn.classList.add("info-item", "table");
        setorColumn.id = "setor" + i;
        setorColumn.textContent = item.setor;
        row.appendChild(setorColumn);

        const statusColumn = document.createElement("div");
        statusColumn.classList.add("info-item", "table");
        statusColumn.id = "status" + i;
        statusColumn.textContent = item.status;
        row.appendChild(statusColumn);

        const typeColumn = document.createElement("div");
        typeColumn.classList.add("info-item", "table");
        typeColumn.id = "tipo" + i;
        typeColumn.textContent = item.tipo;
        row.appendChild(typeColumn);

        const toolsColumn = document.createElement("div");
        toolsColumn.classList.add("info-item", "tools");

        //   const editButton = document.createElement("img");
        //   editButton.src = "../assets/usuarios/lapis.png";
        //   editButton.onclick = editar;

        const iconEditar = document.createElement("img");
        iconEditar.setAttribute("src", "../assets/usuarios/lapis.png");
        iconEditar.addEventListener("click", function () {
            editar(item.setor, item.status, item.tipo, i, item.volume);
        });

        const deleteButton = document.createElement("img");
        deleteButton.setAttribute("src", "../assets/usuarios/lixeira.png");
        deleteButton.addEventListener("click", function () {
            modal_deletar(i);
        });

        toolsColumn.appendChild(iconEditar);
        toolsColumn.appendChild(deleteButton);
        row.appendChild(toolsColumn);

        tableContainer.appendChild(row);
    }
}

var data;

function buscar_computador() {
    let search = busca.value;
    console.log(`Buscando por: "${search}"`)
    let filteredData = data.filter(item => item.hostname == search);
    if (filteredData.length > 0) {
        generateTable(filteredData);
    } else {
        generateTable(data);
    }
}

function listarMaquina() {
    fkEmpresa = sessionStorage.FK_EMPRESA;

    fetch(`/maquina/listarMaquina/${fkEmpresa}`, {
    }).then(function (resposta) {

        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                data = resposta
                generateTable(resposta);
            });

        } else {
            throw ("Houve um erro ao tentar buscar lista de computadores!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}
