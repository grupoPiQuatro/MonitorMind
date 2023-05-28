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

router.get("/dadosRede/:hostname", function (req, res) {
    pcController.dadosRede(req, res);
})

router.get("/pegarComp/:hostname", function (req, res) {
    pcController.pegarComp(req, res);
})

router.get("/dadosRam/:hostname/:idRam", function (req, res) {
    pcController.dadosRam(req, res);
})

router.get("/dadosRam/:hostname/:idCpu", function (req, res) {
    pcController.dadosCpu(req, res);
})

router.get("/dadosDisco/:hostname/:idDisco", function (req, res) {
    pcController.dadosDisco(req, res);
})

router.get("/dadosDisco/:hostname/:idDisco", function (req, res) {
    pcController.dadosDisco(req, res);
})

router.get("/atualizarRede/:hostname", function (req, res) {
    pcController.atualizarRede(req, res);
})

router.get("/atualizarRam/:hostname/:idRam", function (req, res) {
    pcController.atualizarRam(req, res);
})

router.get("/atualizarCpu/:hostname/:idCpu", function (req, res) {
    pcController.atualizarCpu(req, res);
})

router.get("/atualizarDisco/:hostname/:idDisco", function (req, res) {
    pcController.atualizarDisco(req, res);
})

module.exports = router;