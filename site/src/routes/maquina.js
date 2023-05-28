var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/listarMaquina/:fkEmpresa", function (req, res) {
    maquinaController.listarMaquina(req, res);
});

router.post("/cadastrarMaquina", function (req, res) {
    maquinaController.cadastrarMaquina(req, res);
})

router.get("/deletarMaquina/:hostnameDelete", function (req, res) {
    maquinaController.deletarMaquina(req, res);
})
module.exports = router;