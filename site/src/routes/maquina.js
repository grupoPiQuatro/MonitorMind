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

router.get("/encontrarConfig/:edit_tipo/:volume", function (req, res) {
    maquinaController.encontrarConfig(req, res);
})

router.get("/inserirConfig/:edit_tipo/:volume", function (req, res) {
    maquinaController.inserirConfig(req, res);
})

router.put("/editarMaquina", function (req, res) {
    maquinaController.editarMaquina(req, res);
})

module.exports = router;