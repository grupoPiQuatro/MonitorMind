window.addEventListener("load", function () {
    buscarUsuario()
});

function buscarUsuario() {
    fkEmpresa = sessionStorage.FK_EMPRESA;

    fetch(`/usuarioAdmin/listar/${fkEmpresa}`, { cache: 'no-store' }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                exibirUsuario(resposta)
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}

function exibirUsuario(resposta) {
    var tabela = document.createElement('table');

    var cabecalho = tabela.createTHead();
    var linhaCabecalho = cabecalho.insertRow();
    var celula1 = linhaCabecalho.insertCell();
    var celula2 = linhaCabecalho.insertCell();
    var celula3 = linhaCabecalho.insertCell();
    var celula4 = linhaCabecalho.insertCell();

    celula1.innerHTML = "ID";
    celula2.innerHTML = "Nome";
    celula3.innerHTML = "Email";
    celula4.innerHTML = "Tipo";

    for (var i = 0; i < resposta.length; i++) {
        var linha = tabela.insertRow();
        var celulaID = linha.insertCell();
        var celulaNome = linha.insertCell();
        var celulaEmail = linha.insertCell();
        var celulaTipo = linha.insertCell();

        celulaID.innerHTML = resposta[i].idUsuario;
        celulaNome.innerHTML = resposta[i].nomeUsuario;
        celulaEmail.innerHTML = resposta[i].email;
        celulaTipo.innerHTML = resposta[i].tipo;
    }

    var div = document.getElementById('tabela');
    div.appendChild(tabela);

}


function validarAdicionarUsuario() {
    usuarioVar = ipt_usuario.value;
    emailVar = ipt_email.value;
    senhaVar = ipt_senha.value;
    confirmarSenhaVar = ipt_senhaConfirmar.value;
    tipoUsuarioVar = sel_tipo.value;
    fkEmpresaVar = sessionStorage.FK_EMPRESA;

    var validarCampos = true;
    
    if (usuarioVar == "") {
        msgUsuario.style.display = "flex";
        validarCampos = false;
    } else {
        msgUsuario.style.display = "none";
    }

    if (emailVar == "" || emailVar.indexOf('@') == -1 || emailVar.endsWith('.com') == false) {
        msgEmail.style.display = "flex";
        validarCampos = false;
    } else {
        msgEmail.style.display = "none";
    }

    if (senhaVar == "") {
        msgSenha.style.display = "flex";
        validarCampos = false;
    } else {
        msgSenha.style.display = "none";
    }

    if (senhaVar != confirmarSenhaVar) {
        msgConfirmarSenha.style.display = "flex";
        validarCampos = false;
    } else {
        msgConfirmarSenha.style.display = "none";
    }
    
    if (validarCampos) {
        cadastrarUsuario(usuarioVar, emailVar, senhaVar, tipoUsuarioVar, fkEmpresaVar);
    }
}

function cadastrarUsuario(usuarioVar, emailVar, senhaVar, tipoUsuarioVar, fkEmpresaVar) {
    
    fetch("/usuarios/cadastrarUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            usuarioServer: usuarioVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            tipoServer: tipoUsuarioVar,
            fkEmpresaServer: fkEmpresaVar

        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            alert("Usuário cadastrado!!!")

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });
}