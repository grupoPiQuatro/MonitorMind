var maquinaModel = require("../models/maquinaModel");

var sessoes = [];

function listarMaquina(req, res) {

    var fkEmpresa = req.params.fkEmpresa;

    maquinaModel.listarMaquinas(fkEmpresa)
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

function cadastrarMaquina(req, res) {
    var setor = req.body.setorServer;
    var hostName = req.body.hostnameServer;
    var tipoArmazenamento = req.body.tipoServer;
    var tamanhoRam = req.body.seramServer;
    var so = req.body.soServer;
    cpu = req.body.cpuServer;

    maquinaModel.cadastrarMaquina(setor, hostName, tipoArmazenamento, tamanhoRam, so, cpu)
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

function listarComponentes(req, res){

    maquinaModel.cadastrarMaquina()
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
module.exports = {
    listarMaquina,
    cadastrarMaquina,
    listarComponentes
}