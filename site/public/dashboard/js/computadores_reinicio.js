function sleep(ms) {
    const startTime = Date.now();
    while (Date.now() - startTime < ms) {}
}

// ADICIONAR
function adicionar_reinicio() {
    var modal = document.getElementById("modal_add")
    modal.style.display = "block"
}

function sair_adicionar_reinicio() {
    var modal = document.getElementById("modal_add")
    modal.style.display = "none"
}

function confirmar_adicionar_reinicio() {
    var modal = document.getElementById("modal_add")
    
    modal.style.display = "none"
    adicionarReinicio()
    sleep(3000)
    listarReiniciar()
}

function adicionarReinicio(){
    let hostname = document.getElementById("add_hostname").value
    console.log(hostname)
    fetch(`/reinicio/adicionarReinicio`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            hostnameServer: hostname
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            console.log("resposta: ", resposta);
            console.log(`Reincio adiado`)            
        } else {
            throw ("Houve um erro ao tentar reiniciar!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

// EDITAR

function fechar_modal_reiniciar(idReiniciar) {
    adiarReiniciar(idReiniciar)
    var modal_editar_user = document.getElementById("modal_editar_user");
    modal_editar_user.style.display = "block";
}


function sair_editar_reinicio() {
    var modal = document.getElementById("modal_editar_user")

    modal.style.display = "none"
}


function confirmar_editar_reinicio() {
    var modal = document.getElementById("modal_editar_user")

    modal.style.display = "none"
}

function adiarReiniciar(idReiniciar){

    fetch(`/reinicio/adiarReinicio`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idServer: idReiniciar
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            console.log("resposta: ", resposta);
            console.log(`Reincio adiado`)            
        } else {
            throw ("Houve um erro ao tentar reiniciar!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

// DELETAR

var idVar;
function deletar_reiniciar(id) {
    idVar = id;
    var modal = document.getElementById("modal_delete")
    modal.style.display = "block"
}

function sair_deletar() {
    var modal = document.getElementById("modal_delete")

    modal.style.display = "none"
}

function confirmar_deletar_reinicio() {
    var modal = document.getElementById("modal_delete")
    modal.style.display = "none"
    let id = idVar

    deletarReiniciar(id);
    sleep(3000);
    listarReiniciar();
}

function deletarReiniciar(id){

    fetch(`/reinicio/deletarReinicio`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idServer: id
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            console.log("resposta: ", resposta);
            console.log(`Reincio adiado`)            
        } else {
            throw ("Houve um erro ao tentar reiniciar!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

function generateTable(data) {
    const tableContainer = document.getElementById("tabela-computadores");

    tableContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const row = document.createElement("div");
    row.classList.add("linha-tabela");
    
    
    const hostnameColumn = document.createElement("div");
    hostnameColumn.classList.add("info-item", "table");
    hostnameColumn.id = "hostname" + i;
    hostnameColumn.textContent = item.hostname;
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

    const dateColumn = document.createElement("div");
    dateColumn.classList.add("info-item", "table");
    dateColumn.id = "date" + i;
    let dateVar = item.hora;

    var dtCaptura = dateVar.toString();
    var dtCapVar = new Date(dtCaptura);
    var horaFormatada = dtCapVar.toISOString().substring(11, 19);
    
    dateColumn.textContent = horaFormatada;
    row.appendChild(dateColumn);

    const toolsColumn = document.createElement("div");
    toolsColumn.classList.add("info-item", "tools");

    const fiveMinButton = document.createElement("img");
    fiveMinButton.setAttribute("src", "../assets/usuarios/plus-five.png");
    fiveMinButton.addEventListener("click", function() {
        fechar_modal_reiniciar(data[i].idReinciar);
    });

    const deleteButton = document.createElement("img");
    deleteButton.setAttribute("src", "../assets/usuarios/cancel-button.png");
    deleteButton.addEventListener("click", function() {
        deletar_reiniciar(data[i].idReinciar);
    });

    toolsColumn.appendChild(fiveMinButton);
    toolsColumn.appendChild(deleteButton);
    row.appendChild(toolsColumn);

    tableContainer.appendChild(row);
    }
}

function emptyTable(data) {
    const tableContainer = document.getElementById("tabela-computadores");

    tableContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const row = document.createElement("div");
    row.classList.add("linha-tabela");
    
    
    const hostnameColumn = document.createElement("div");
    hostnameColumn.classList.add("info-item", "table");
    hostnameColumn.id = "hostname" + i;
    hostnameColumn.textContent = item.hostname;
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

    const dateColumn = document.createElement("div");
    dateColumn.classList.add("info-item", "table");
    dateColumn.id = "date" + i;
    let dateVar = item.hora;

    var dtCaptura = dateVar.toString();
    var dtCapVar = new Date(dtCaptura);
    var horaFormatada = dtCapVar.toISOString().substring(11, 19);
    
    dateColumn.textContent = horaFormatada;
    row.appendChild(dateColumn);

    const toolsColumn = document.createElement("div");
    toolsColumn.classList.add("info-item", "tools");

    row.appendChild(toolsColumn);

    tableContainer.appendChild(row);
    }
}

var data;

function buscar_reinicio() {
    let search = busca.value;
    console.log(`Buscando por: "${search}"`)
    let filteredData = data.filter(item => item.hostname == search);
    if (filteredData.length > 0) {
        generateTable(filteredData);
    }else{
        generateTable(data);
    }
}

listarReiniciar();
function listarReiniciar() {
    fkEmpresa = sessionStorage.FK_EMPRESA;
    
    fetch(`/reinicio/listarReinicio/${fkEmpresa}`, {
    }).then(function (resposta) {

        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log({"Lista vazia": 204})
                console.log("Gerando lista vazia")
                emptyTable([{"hostname": "...", "setor": "...", "status": "...", "hora": "2023-06-03T00:00:00.007Z", "idReiniciar": "..."}]);
            }else{
                resposta.json().then(function (resposta) {
                    data = resposta
                    generateTable(resposta);
                });
            }
                
        } else {
            throw ("Houve um erro ao tentar buscar lista de computadores!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}