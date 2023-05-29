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

function deletarMaquina(req, res) {

    var hostname = req.body.hostnameDelete;

    maquinaModel.deletarMaquina(hostname)
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

function encontrarSetor(req, res) {

    var setor = req.params.edit_setor;

    maquinaModel.encontrarSetor(setor)
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

function encontrarConfig(req, res) {
    var tipo = req.params.tipo;
    // var hostname = req.params.hostname;
    maquinaModel.encontrarConfig(tipo)

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

function editarMaquina(req, res) {
    var setor = fkSetorServer
    var status = statusServer
    var disco = discoServer
    var hostname = hostnameServer

    maquinaModel.editarMaquina(setor, status, disco, hostname)
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
    listarComponentes,
    deletarMaquina,
    encontrarSetor,
    encontrarConfig,
    editarMaquina
}