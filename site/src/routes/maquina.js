var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/listarMaquina/:fkEmpresa", function (req, res) {
    maquinaController.listarMaquina(req, res);
});

router.post("/cadastrarMaquina", function (req, res) {
    maquinaController.cadastrarMaquina(req, res);
})

router.post("/deletarMaquina", function (req, res) {
    maquinaController.deletarMaquina(req, res);
})

router.get("/encontrarSetor/:edit_setor", function (req, res) {
    maquinaController.encontrarSetor(req, res);
})

router.get("/encontrarConfig", function (req, res) {
    var tipo = req.query.tipo;
    // var hostname = req.query.hostname;
    maquinaController.encontrarConfig(tipo, req, res);
})

router.put("/editarMaquina", function (req, res) {
    maquinaController.editarMaquina(req, res);
})

module.exports = router;