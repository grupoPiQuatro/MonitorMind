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
    var fkLocalizacao = req.body.fkLocalizacaoServer;
    var hostname = req.body.hostnameServer;
    var so = req.body.soServer;
    var mac = req.body.macServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    maquinaModel.cadastrarMaquina(hostname, so, mac, fkLocalizacao, fkEmpresa)
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

function listarComponentes(req, res) {

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
    var volume = req.params.volume;

    maquinaModel.encontrarConfig(tipo, volume)

        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(200).json(resultado);
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function encontrarConfig2(req, res) {
    var nome = req.params.nome;
    var numeroChave = req.params.numeroChave;

    maquinaModel.encontrarConfig2(nome, numeroChave)

        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(200).json(resultado);
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function inserirConfig(req, res) {
    var tipo = req.params.edit_tipo
    var volume = req.params.volume

    maquinaModel.inserirConfig(tipo, volume)
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

function inserirComp2(req, res) {
    var numeroChave = req.params.numeroChave
    var unidadeMedida = req.params.unidadeMedida
    var fkTipo = req.params.fkTipo

    maquinaModel.inserirComp2(numeroChave, unidadeMedida, fkTipo)
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
    var hostname = req.body.hostnameServer
    var setor = req.body.fkSetorServer
    var status = req.body.statusServer
    var fkComponente = req.body.fkComponenteServer

    maquinaModel.editarMaquina(hostname, setor, status, fkComponente)
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

function cadastrarConfig(req, res) {
    var hostname = req.body.hostnameServer;
    var fkComponente = req.body.fkComponenteServer;

    maquinaModel.cadastrarConfig(hostname, fkComponente)
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


module.exports = {
    listarMaquina,
    cadastrarMaquina,
    listarComponentes,
    deletarMaquina,
    encontrarSetor,
    encontrarConfig,
    inserirConfig,
    editarMaquina,
    encontrarConfig2,
    inserirComp2,
    cadastrarConfig
}