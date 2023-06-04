var reinicioModel = require("../models/reinicioModel");

var sessoes = [];

function listarReinicio(req, res) {

    var fkEmpresa = req.params.fkEmpresa;

    reinicioModel.listarReinicio(fkEmpresa)
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

function adiarReinicio(req, res) {

    var id = req.body.idServer;

    reinicioModel.adiarReinicio(id)
        .then(function (resultado) {
            res.status(200).json(resultado);

        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deletarReinicio(req, res) {

    var id = req.body.idServer;

    reinicioModel.deletarReinicio(id)
        .then(function (resultado) {
            res.status(200).json(resultado);

        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function adicionarReinicio(req, res) {

    var hostname = req.body.hostnameServer;

    reinicioModel.adicionarReinicio(hostname)

        .then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarReinicio,
    adiarReinicio,
    deletarReinicio,
    adicionarReinicio
}