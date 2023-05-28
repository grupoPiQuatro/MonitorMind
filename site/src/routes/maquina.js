var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/listarMaquina/:fkEmpresa", function (req, res) {
    maquinaController.listarMaquina(req, res);
});

router.post("/cadastrarMaquina", function (req, res) {
    maquinaController.cadastrarUsuario(req, res);
})

module.exports = router;