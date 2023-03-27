var nomeVar;
var cnpjVar;
var telefoneVar;
var cepVar;
var numeroVar;
var usuarioVar;
var emailVar;
var senhaVar;

function validarCad() {
    nomeVar = ipt_nome.value
    cnpjVar = ipt_cnpj.value;
    telefoneVar = ipt_telefone.value;

    var validarCampos = true;

    if (nomeVar == "") {
        msgNomeEmpresa.style.display = "flex"
        validarCampos = false;
    } else {
        msgNomeEmpresa.style.display = "none"
    }

    if (cnpjVar.length != 14) {
        msgCNPJ.style.display = "flex";
        validarCampos = false;
    } else {
        msgCNPJ.style.display = "none";
    }

    if (telefoneVar.length != 10) {
        msgTelefone.style.display = "flex";
        validarCampos = false;
    } else {
        msgTelefone.style.display = "none";
    }

    if (validarCampos) {
        cadastroEmpresa.style.display = "none";
        cadastroEmpresa2.style.display = "flex";
    }
}

function validarCad02() {
    cepVar = ipt_cep.value;
    numeroVar = ipt_numero.value;
    var validarCampos = true;
    
    if (cepVar.length != 8) {
        msgCep.style.display = "flex";
        validarCampos = false;
    } else {
        msgCep.style.display = "none";
    }

    if (numeroVar == "" || /\d/.test(numeroVar) == false) {
        msgNumero.style.display = "flex";
        validarCampos = false;
    } else {
        msgNumero.style.display = "none";
    }
    
    if (validarCampos) {
        cadastroEmpresa2.style.display = "none";
        cadastroEmpresa3.style.display = "flex";
    }
}

function validarCad03() {
    usuarioVar = ipt_usuario.value;
    emailVar = ipt_email.value;
    senhaVar = ipt_senha.value;
    confirmarSenhaVar = ipt_senhaConfirmar.value;
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
        cadastrarEmpresaDados()
    }
}

function voltarHome() {
    window.location = "index.html"
}

// API DO VIACEP

function validarCEP() {
    var cep = document.getElementById("ipt_cep").value;

    if (cep.length == 8) {
        buscarCEP(cep);
    } else {
        document.getElementById("ipt_logradouro").value = "";
        document.getElementById("ipt_bairro").value = "";
        document.getElementById("ipt_cidade").value = "";
        document.getElementById("ipt_estado").value = "";
    }
}

function buscarCEP(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(function (resposta) {
            if (resposta.ok) {
                console.log(resposta);
                resposta.json().then(function (dados) {
                    console.log(dados);
                    console.log(JSON.stringify(dados));

                    document.getElementById("ipt_logradouro").value = dados.logradouro;
                    document.getElementById("ipt_bairro").value = dados.bairro;
                    document.getElementById("ipt_cidade").value = dados.localidade;
                    document.getElementById("ipt_estado").value = dados.uf;

                    document.getElementById("ipt_logradouro").disabled = true;
                    document.getElementById("ipt_bairro").disabled = true;
                    document.getElementById("ipt_cidade").disabled = true;
                    document.getElementById("ipt_estado").disabled = true;
                });
            } else {
                console.log("Dados incorretos")
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`)
        })
}

// API CADASTRAR TABELA EMPRESA

function cadastrarEmpresaDados() {

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo

    if (nomeVar == "" || cnpjVar == "") {
        alert("Erro: dados da empresa vazios")
        return false;
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrarEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            cnpjServer: cnpjVar,
            telefoneServer: telefoneVar,

        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            console.log('Eba');
            cadastrarEnderecoDados();

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

}

// API CADASTRAR TABELA ENDERECO

function cadastrarEnderecoDados() {

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var cepVar = ipt_cep.value;
    var numeroVar = ipt_numero.value;

    if (nomeVar == "" || cnpjVar == "") {
        alert("Erro: dados do endereco vazios")
        return false;
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrarEndereco", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            cepServer: cepVar,
            numeroServer: numeroVar,
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            cadastrarUsuarioDados();

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

// API CADASTRAR TABELA USUARIO

function cadastrarUsuarioDados() {

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo

    if (usuarioVar == "" || emailVar == "" || senhaVar == "") {
        alert("Erro: dados do usuario vazios")
        return false;
    }

    // Enviando o valor da nova input
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
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            setTimeout(() => {
                window.location = "login.html";
            }, "500")

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });

    return false;
}

var temaClaro = true;
function trocarTema() {
    let tema = document.getElementById("forms");
    let logo = document.getElementById("logoMM");
    let logo02 = document.getElementById("logoMM02");
    let logo03 = document.getElementById("logoMM03");
    let temaImagem = document.getElementById("temaImg");
    let cadastroTitulo = document.getElementById("titulo");
    let cadastroTitulo02 = document.getElementById("titulo02");
    let cadastroTitulo03 = document.getElementById("titulo03");
    let labelNome01 = document.getElementById("label01");
    let labelNome02 = document.getElementById("label02");
    let labelNome03 = document.getElementById("label03");
    let labelNome04 = document.getElementById("label04");
    let labelNome05 = document.getElementById("label05");
    let labelNome06 = document.getElementById("label06");
    let labelNome07 = document.getElementById("label07");
    let labelNome08 = document.getElementById("label08");
    let labelNome09 = document.getElementById("label09");
    let labelNome10 = document.getElementById("label10");
    let labelNome11 = document.getElementById("label11");
    let labelNome12 = document.getElementById("label12");
    let labelNome13 = document.getElementById("label13");
    let setaImg = document.getElementById("seta");


    if (temaClaro) {
        tema.style.backgroundColor = "#1A1A1A";
        cadastroTitulo.style.color = "#FFF";
        cadastroTitulo02.style.color = "#FFF";
        cadastroTitulo03.style.color = "#FFF";
        labelNome01.style.color = "#FFF";
        labelNome02.style.color = "#FFF";
        labelNome03.style.color = "#FFF";
        labelNome04.style.color = "#FFF";
        labelNome05.style.color = "#FFF";
        labelNome06.style.color = "#FFF";
        labelNome07.style.color = "#FFF";
        labelNome08.style.color = "#FFF";
        labelNome09.style.color = "#FFF";
        labelNome10.style.color = "#FFF";
        labelNome11.style.color = "#FFF";
        labelNome12.style.color = "#FFF";
        labelNome13.style.color = "#FFF";
        logo.src = "assets/LogoClara.png"
        logo02.src = "assets/LogoClara.png"
        logo03.src = "assets/LogoClara.png"
        temaImagem.src = "assets/icon-sol.png"
        setaImg.src = "assets/icon-seta.png";
        temaClaro = false;
    } else {
        tema.style.backgroundColor = "#FFF";
        cadastroTitulo.style.color = "#000000";
        cadastroTitulo02.style.color = "#000000";
        cadastroTitulo03.style.color = "#000000";
        labelNome01.style.color = "#000000";
        labelNome02.style.color = "#000000";
        labelNome03.style.color = "#000000";
        labelNome04.style.color = "#000000";
        labelNome05.style.color = "#000000";
        labelNome06.style.color = "#000000";
        labelNome07.style.color = "#000000";
        labelNome08.style.color = "#000000";
        labelNome09.style.color = "#000000";
        labelNome10.style.color = "#000000";
        labelNome11.style.color = "#000000";
        labelNome12.style.color = "#000000";
        labelNome13.style.color = "#000000";
        logo.src = "assets/logoEscura.png"
        logo02.src = "assets/logoEscura.png"
        logo03.src = "assets/logoEscura.png"
        temaImagem.src = "assets/icon-lua.png"
        setaImg.src = "assets/icon-setaEscura.png";
        temaClaro = true;
    }

}