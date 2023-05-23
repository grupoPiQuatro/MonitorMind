var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/", function (req, res) {
    avisoController.testar(req, res);
});

router.get("/listar", function (req, res) {
    avisoController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    avisoController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});

router.delete("/deletar/:idAviso", function (req, res) {
    avisoController.deletar(req, res);
});

router.get("/puxar/:fkEmpresa", function (req, res) {
    avisoController.puxar(req, res);
});

router.get("/comptotal/:fkEmpresa", function (req, res) {
    avisoController.comptotal(req, res);
});

router.get("/semRespostaPing/:fkEmpresa", function (req, res) {
    avisoController.semRespostaPing(req, res);
});
router.get("/reinicioMaiorQueUm/:fkEmpresa", function (req, res) {
    avisoController.reinicioMaiorQueUm(req, res);
});
router.get("/riscoPreenchimento/:fkEmpresa", function (req, res) {
    avisoController.riscoPreenchimento(req, res);
});
router.get("/alertaPorComponente/:fkEmpresa", function (req, res) {
    avisoController.alertaPorComponente(req, res);
});
router.get("/percentPcReinicio/:fkEmpresa", function (req, res) {
    avisoController.percentPcReinicio(req, res);
});
router.get("/tempoStatus/:fkEmpresa", function (req, res) {
    avisoController.tempoStatus(req, res);
});

module.exports = router;