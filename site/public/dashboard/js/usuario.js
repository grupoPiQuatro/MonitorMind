function listarUsuarios() {
    fkEmpresa = sessionStorage.FK_EMPRESA;

    fetch(`/usuarios/listarUsuario/${fkEmpresa}`, {
    }).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log(resposta);
                data1 = resposta;
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

function generateTable(usuarios) {
    const tableContainer = document.getElementById("tabela-usuarios");

    tableContainer.innerHTML = "";

    for (let i = 0; i < usuarios.length; i++) {
        const item = usuarios[i];
        const row = document.createElement("div");
        row.classList.add("linha-tabela");

        const idColumn = document.createElement("div");
        idColumn.classList.add("info-item", "table");
        idColumn.id = "id" + i;
        idColumn.textContent = item.idUsuario;
        row.appendChild(idColumn);

        const userColumn = document.createElement("div");
        userColumn.classList.add("info-item", "table");
        userColumn.id = "usuario" + i;
        userColumn.textContent = item.nome;
        row.appendChild(userColumn);

        const emailColumn = document.createElement("div");
        emailColumn.classList.add("info-item", "table");
        emailColumn.id = "email" + i;
        emailColumn.textContent = item.email;
        row.appendChild(emailColumn);

        const typeColumn = document.createElement("div");
        typeColumn.classList.add("info-item", "table");
        typeColumn.id = "cargo" + i;
        if (item.fkCargo == 1) {
            typeColumn.textContent = "Owner";
        } else if (item.fkCargo == 2) {
            typeColumn.textContent = "Admin";
        } else if (item.fkCargo == 3) {
            typeColumn.textContent = "Normal";
        }
        row.appendChild(typeColumn);

        const toolsColumn = document.createElement("div");
        toolsColumn.classList.add("info-item", "tools");

        const iconEditar = document.createElement("img");
        iconEditar.setAttribute("src", "../assets/usuarios/lapis.png");
        iconEditar.addEventListener("click", function () {
            editar(i, item.nome, item.email, item.fkCargo);
        });

        const deleteButton = document.createElement("img");
        deleteButton.setAttribute("src", "../assets/usuarios/lixeira.png");
        deleteButton.addEventListener("click", function () {
            deletar_usuario(i);
        });

        toolsColumn.appendChild(iconEditar);
        toolsColumn.appendChild(deleteButton);
        row.appendChild(toolsColumn);

        tableContainer.appendChild(row);
    }
}

// ADICIONAR

function adicionar_usuario() {
    var modal = document.getElementById("modal_user")

    modal.style.display = "block"
}

function sair_adicionar_usuario() {
    var modal = document.getElementById("modal_user");

    add_usuario.value = "";
    add_email.value = "";
    add_tipo.getElementsByTagName('option')[0].selected = true;
    add_senha.value = "";
    add_confirmaSenha.value = "";
    modal.style.display = "none"
}

function confirmar_adicionar_usuario() {
    var modal = document.getElementById("modal_user")

    var nomeUsuario = add_usuario.value;
    var email = add_email.value;
    var tipo = add_tipo.value;
    var senha = add_senha.value;
    var confirmaSenha = add_confirmaSenha.value;
    var fkEmpresa = sessionStorage.FK_EMPRESA;

    if (senha != confirmaSenha) {
        alert('Senhas incoerentes');
        return false;
    }

    var cargo = null;

    if (tipo == "Normal") {
        cargo = 3;
    } else if (tipo == "Admin") {
        cargo = 2;
    } else {
        cargo = 1;
    }

    fetch(`/usuarios/cadastrarUsuario`, {
        cache: 'no-store',
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuarioServer: nomeUsuario,
            emailServer: email,
            senhaServer: senha,
            idEmpresaServer: fkEmpresa,
            fkCargoServer: cargo
        })

    }).then(function (resposta) {
        if (resposta.ok) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));

            listarUsuarios();
            modal.style.display = "none";

        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}

// EDITAR

var usuarioGlobal = null;
var emailGlobal = null;
var cargoGlobal = null;
var editarId = null;

function editar(i, usuario, email, fkCargo) {
    editarId = i;
    usuarioGlobal = usuario;
    emailGlobal = email;

    if (fkCargo == 3) {
        cargoGlobal = "Normal";
    } else if (fkCargo == 2) {
        cargoGlobal = "Admin";
    } else {
        cargoGlobal = "Owner";
    }
    
    var edit_usuario = document.getElementById("edit_usuario");
    var edit_email = document.getElementById("edit_email");
    var edit_tipo = document.getElementById("edit_tipo");

    edit_usuario.value = usuario;
    edit_email.value = email;

    if (fkCargo == 3) {
        edit_tipo.getElementsByTagName('option')[1].selected = true;
    } else if (fkCargo == 2) {
        edit_tipo.getElementsByTagName('option')[2].selected = true;
        if (sessionStorage.TIPO_USUARIO == 3) {
            edit_tipo.disabled = true;
        }
    } else {
        edit_tipo.getElementsByTagName('option')[3].selected = true;
        if (sessionStorage.TIPO_USUARIO != 1) {
            edit_tipo.disabled = true;
        }
    }

    // Abra o modal
    var modal_editar_user = document.getElementById("modal_editar_user");
    modal_editar_user.style.display = "block";
}

function sair_editar_usuario() {
    var modal = document.getElementById("modal_editar_user")

    edit_senha.value = "";
    edit_confirma_senha.value = "";
    modal.style.display = "none"


    document.getElementById('edit_tipo').disabled = false;
    modal.style.display = "none"
}


function confirmar_editar_usuario() {
    var modal = document.getElementById("modal_editar_user")

    var nome = document.getElementById("edit_usuario").value;
    var email = document.getElementById("edit_email").value;
    var cargo = document.getElementById("edit_tipo").value;

    var idUsuario = document.getElementById("id" + editarId).textContent;

    if (nome != usuarioGlobal) {
        fetch(`/usuarios/atualizarDados`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                colunaServer: "nome",
                alteracaoServer: nome,
                idUsuarioServer: idUsuario
            })
        }).then(function (resposta) {
    
            if (resposta.ok) {
    
                listarUsuarios()
                alert("Nome do usuário editado!!")
                modal.style.display = "none";
    
            } else {
                throw ("Houve um erro ao tentar editar nome do usuário!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    } 

    if (email != emailGlobal) {
        fetch(`/usuarios/atualizarDados`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                colunaServer: "email",
                alteracaoServer: email,
                idUsuarioServer: idUsuario
            })
        }).then(function (resposta) {
    
            if (resposta.ok) {
    
                listarUsuarios()
                alert("Email do usuario editado!!")
                modal.style.display = "none";
    
            } else {
                throw ("Houve um erro ao tentar editar email!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    } 

    if (cargo != cargoGlobal) {

        var fkCargo = null;
        if (cargo == "Normal") {
            fkCargo = 3;
        } else if (cargo == "Admin") {
            fkCargo = 2;
        } else {
            fkCargo = 1;
        }

        fetch(`/usuarios/atualizarDados`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                colunaServer: "fkCargo",
                alteracaoServer: fkCargo,
                idUsuarioServer: idUsuario
            })
        }).then(function (resposta) {
    
            if (resposta.ok) {
    
                listarUsuarios()
                alert("Cargo do usuário editado!!")
                modal.style.display = "none";
    
            } else {
                throw ("Houve um erro ao tentar editar cargo!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    } 

    var senha = document.getElementById("edit_senha").value;
    var senhaConfirmar = document.getElementById("edit_confirma_senha").value;

    if (senha != senhaConfirmar) {
        alert("Senhas diferentes !!");
        return false;
    }

    fetch(`/usuarios/atualizarDados`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            colunaServer: "senha",
            alteracaoServer: senha,
            idUsuarioServer: idUsuario
        })
    }).then(function (resposta) {

        if (resposta.ok) {

            listarUsuarios()
            alert("Senha do usuário editado!!")
            modal.style.display = "none";

        } else {
            throw ("Houve um erro ao tentar editar cargo!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

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
    var modal = document.getElementById("modal_delete");
    var idUsuario = document.getElementById("id" + user_delete).textContent;
    console.log(idUsuario);

    fetch(`/usuarios/deletarUsuario/${idUsuario}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {

        if (resposta.ok) {

            listarUsuarios()
            alert("Usuário deletado")
            modal.style.display = "none";

        } else {
            throw ("Houve um erro ao tentar deletar maquina!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

// var data1 = [
// { id: 01, usuario: "Lucas", email: "lucas@email", tipo: "Comum" },
// { id: 02, usuario: "Nathan", email: "nathan@email", tipo: "Admin" },
// { id: 03, usuario: "Emille", email: "emille@email", tipo: "Comum" },
// { id: 04, usuario: "Andres", email: "Andres@email", tipo: "Comum" },
// { id: 05, usuario: "Tarciso", email: "Tarciso@email", tipo: "Admin" },
// { id: 06, usuario: "Carlos", email: "Carlos@email", tipo: "Comum" },
// { id: 07, usuario: "Carlos", email: "Carlos@email", tipo: "Comum" }
// ];

var data1 = null;

function buscar_usuario() {
    const search = busca.value;
    let filteredData = data1.filter(item => item.nome === search);
    console.log(filteredData)
    if (filteredData.length > 0) {
        generateTable(filteredData);
    } else {
        listarUsuarios();
    }
}