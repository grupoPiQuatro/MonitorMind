var express = require("express");
var router = express.Router();

var pcController = require("../controllers/pcController");

// router.get("/listar", function (req, res) {
//     maquinaControler.listar(req, res);
// });

router.get("/buscarPc/:fkEmpresa", function (req, res) {
    pcController.listar(req, res);
})

router.get("/buscarParametro/:fkEmpresa", function (req, res) {
    pcController.buscarParametro(req, res);
})

router.get("/buscarStatus/:fkEmpresa", function (req, res) {
    pcController.buscarStatus(req, res);
})

router.get("/buscarPcSemRetorno/:fkEmpresa", function (req, res) {
    pcController.buscarPcSemRetorno(req, res);
})

router.get("/dadosRede/:fkEmpresa", function (req, res) {
    pcController.dadosRede(req, res);
})

module.exports = router;