function entrar() {
    var emailVar = ipt_email.value; 
    var senhaVar = ipt_senha.value;

    console.log("FORM LOGIN: ", emailVar);

    if (emailVar == "" || senhaVar == "") {
        alert('Campos vazios')

        finalizarAguardar();
        return false;
    }



    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.TIPO_USUARIO = json.fkCargo;
                sessionStorage.FK_EMPRESA = json.fkEmpresa;

                setTimeout(function () {

                    window.location = "dashboard/html/home.html";

                }, 1000);

            });

        } else {
            alert('Erro na resposta');
            // alert("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

var temaClaro = true;
function trocarTema() {
    let tema = document.getElementById("forms");
    let logo = document.getElementById("logoMM");
    let temaImagem = document.getElementById("temaImg");
    let cadastroTitulo = document.getElementById("titulo");
    let labelNome01 = document.getElementById("nomeCampo01");
    let labelNome02 = document.getElementById("nomeCampo02");
    let setaImg = document.getElementById("seta");

    if (temaClaro) {
        tema.style.backgroundColor = "#1A1A1A";
        cadastroTitulo.style.color = "#FFF";
        labelNome01.style.color = "#FFF";
        labelNome02.style.color = "#FFF";
        logo.src = "assets/LogoClara.png";
        temaImagem.src = "assets/icon-sol.png";
        setaImg.src = "assets/icon-seta.png";
        temaClaro = false;
    } else {
        tema.style.backgroundColor = "#FFF";
        cadastroTitulo.style.color = "#000000";
        labelNome01.style.color = "#000000";
        labelNome02.style.color = "#000000";
        logo.src = "assets/logoEscura.png";
        temaImagem.src = "assets/icon-lua.png";
        setaImg.src = "assets/icon-setaEscura.png";
        temaClaro = true;
    }
}

function voltarHome() {
    window.location = "index.html"
}