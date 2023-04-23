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

function editar(usuario, email, tipo) {
    var edit_usuario = document.getElementById("edit_usuario");
    var edit_email = document.getElementById("edit_email");
    var edit_tipo = document.getElementById("edit_tipo");
    var edit_senha = document.getElementById("edit_senha");
    var edit_confirma_senha = document.getElementById("edit_confirma-senha");

    edit_usuario.value = usuario;
    edit_email.value = email;
    edit_tipo.value = tipo;
    // edit_senha.value = user.senha;
    // edit_confirma_senha.value = user.senha;

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
    const tableContainer = document.getElementById("tabela-usuarios");

    tableContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const row = document.createElement("div");
    row.classList.add("linha-tabela");

    const idColumn = document.createElement("div");
    idColumn.classList.add("info-item", "table");
    idColumn.id = "id" + i;
    idColumn.textContent = item.id;
    row.appendChild(idColumn);

    const userColumn = document.createElement("div");
    userColumn.classList.add("info-item", "table");
    userColumn.id = "usuario" + i;
    userColumn.textContent = item.usuario;
    row.appendChild(userColumn);

    const emailColumn = document.createElement("div");
    emailColumn.classList.add("info-item", "table");
    emailColumn.id = "email" + i;
    emailColumn.textContent = item.email;
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

    const iconEditar = document.createElement("img");
    iconEditar.setAttribute("src", "../assets/usuarios/lapis.png");
    iconEditar.addEventListener("click", function() {
        editar(item.usuario, item.email, item.tipo);
    });

    const deleteButton = document.createElement("img");
    deleteButton.setAttribute("src", "../assets/usuarios/lixeira.png");
    deleteButton.addEventListener("click", function() {
        deletar_usuario(i);
    });

    toolsColumn.appendChild(iconEditar);
    toolsColumn.appendChild(deleteButton);
    row.appendChild(toolsColumn);

    tableContainer.appendChild(row);
    }
}

var data = [
{ id: 1, usuario: "Lucas", email: "lucas@email", tipo: "comum" },
{ id: 2, usuario: "Nathan", email: "nathan@email", tipo: "admin" },
{ id: 3, usuario: "Emille", email: "emille@email", tipo: "comum" },
{ id: 4, usuario: "Andres", email: "Andres@email", tipo: "comum" },
{ id: 5, usuario: "Tarciso", email: "Tarciso@email", tipo: "admin" },
{ id: 5, usuario: "Carlos", email: "Carlos@email", tipo: "comum" },
];

generateTable(data);