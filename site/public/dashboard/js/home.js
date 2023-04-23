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


function legenda_box(){
    
}