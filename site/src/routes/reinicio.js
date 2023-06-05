var express = require("express");
var router = express.Router();

var reinicioController = require("../controllers/reinicioController");

router.get("/listarReinicio/:fkEmpresa", function (req, res) {
    reinicioController.listarReinicio(req, res);
});

router.put("/adiarReinicio", function (req, res) {
    reinicioController.adiarReinicio(req, res);
});

router.put("/deletarReinicio", function (req, res) {
    reinicioController.deletarReinicio(req, res);
});

router.post("/adicionarReinicio", function (req, res) {
    reinicioController.adicionarReinicio(req, res);
});

module.exports = router;