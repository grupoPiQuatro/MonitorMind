var usuarioAdminModel = require("../models/usuarioAdminModel");

var sessoes = [];

function listar(req, res) {

    var fkEmpresa = req.params.fkEmpresa;

    usuarioAdminModel.listar(fkEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrarUsuario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var usuario = req.body.usuarioServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipo = req.body.tipoServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    // Faça as validações dos valores
    if (usuario == undefined) {
        res.status(400).send("Seu usuario está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarUsuario(usuario, email, senha, tipo, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    listar
}