// ADICIONAR

function adicionar_usuario() {
    var modal = document.getElementById("modal_user")

    modal.style.display = "block"
}

function sair_adicionar_usuario() {
    var modal = document.getElementById("modal_user")

    modal.style.display = "none"
}

function sair_adicionar_usuario() {
    var modal = document.getElementById("modal_user")

    modal.style.display = "none"
}

function confirmar_adicionar_usuario() {
    var modal = document.getElementById("modal_user")

    modal.style.display = "none"
}

// EDITAR

function delayFive() {

    // Abra o modal
    var modal_editar_user = document.getElementById("modal_editar_user");
    modal_editar_user.style.display = "block";
}

// function editar() {
//     let modal = document.getElementById("modal_user")

//     let id0 = document.getElementById("id0").value
//     let usuario0 = document.getElementById("usuario0").value
//     let email0 = document.getElementById("email0").value
//     let tipo0 = document.getElementById("tipo0").value

//     let id = document.getElementById("edit_usuario").value = id0
//     let usuario = document.getElementById("edit_email").value = usuario0
//     let email = document.getElementById("edit_tipo")
//     let tipo = document.getElementById("edit_senha").value = email0

//     // id.value = id0
//     // usuario.value = usuario0
//     // email.value = email0

//     modal.style.display = "block"
// }

function sair_editar_usuario() {
    var modal = document.getElementById("modal_editar_user")

    modal.style.display = "none"
}


function confirmar_editar_usuario() {
    var modal = document.getElementById("modal_editar_user")

    modal.style.display = "none"
}

// DELETAR
var user_delete = -1;

function deletar_usuario(i) {
    var modal = document.getElementById("modal_delete")
    user_delete = i
    modal.style.display = "block"
}

function sair_deletar() {
    var modal = document.getElementById("modal_delete")

    modal.style.display = "none"
    user_delete = -1
}

function confirmar_deletar_usuario() {
    var modal = document.getElementById("modal_delete")

    if (user_delete > -1) {
        data.splice(data.indexOf(user_delete), 1);
    }
    user_delete = -1

    generateTable(data)
    modal.style.display = "none"
}


// 

function generateTable(data) {
    const tableContainer = document.getElementById("tabela-computadores");

    tableContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const row = document.createElement("div");
    row.classList.add("linha-tabela");
    
    
    const idColumn = document.createElement("div");
    idColumn.classList.add("info-item", "table");
    idColumn.id = "serial" + i;
    idColumn.textContent = item.serial;
    row.appendChild(idColumn);

    const userColumn = document.createElement("div");
    userColumn.classList.add("info-item", "table");
    userColumn.id = "setor" + i;
    userColumn.textContent = item.setor;
    row.appendChild(userColumn);

    const emailColumn = document.createElement("div");
    emailColumn.classList.add("info-item", "table");
    emailColumn.id = "status" + i;
    emailColumn.textContent = item.status;
    row.appendChild(emailColumn);

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

    const fiveMinButton = document.createElement("img");
    fiveMinButton.setAttribute("src", "../assets/usuarios/plus-five.png");
    fiveMinButton.addEventListener("click", function() {
        delayFive();
    });

    const deleteButton = document.createElement("img");
    deleteButton.setAttribute("src", "../assets/usuarios/cancel-button.png");
    deleteButton.addEventListener("click", function() {
        deletar_usuario(i);
    });

    toolsColumn.appendChild(fiveMinButton);
    toolsColumn.appendChild(deleteButton);
    row.appendChild(toolsColumn);

    tableContainer.appendChild(row);
    }
}

var data = [
    { serial: "vFJsboEW", setor: "A", status: "Operando", tipo: "SSD" },
    { serial: "DoBb5HYU", setor: "D", status: "Interrompido", tipo: "SSD" },
    { serial: "oc66mRW2", setor: "A", status: "Manutenção", tipo: "HD" },
    { serial: "nTLMjU6w", setor: "A", status: "Operando", tipo: "SSD" },
    //{ serial: "W2NQb3wb", setor: "C", email: "Tarciso@email", tipo: "admin" },
    // { serial: "SLosBgK3", setor: "A", email: "Carlos@email", tipo: "comum" },
];

generateTable(data);

function buscar_computador() {
    const search = busca.value;
    const filteredData = data.filter(item => item.serial === search);
    if (filteredData.length > 0) {
      generateTable(filteredData);
    }else{
        generateTable(data);
    }
  }
  


