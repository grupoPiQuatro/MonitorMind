var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/cadastrarEndereco", function (req, res) {
    usuarioController.cadastrarEndereco(req, res);
})

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

router.get("/pegarEmpresaId", function (req, res) {
    usuarioController.pegarEmpresa(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.get("/listarUsuario/:fkEmpresa", function (req, res) {
    usuarioController.listarUsuario(req, res);
});

router.delete("/deletarUsuario/:idUsuario", function (req, res) {
    usuarioController.deletarUsuario(req, res);
});

router.put("/atualizarDados", function (req, res) {
    usuarioController.atualizarDados(req, res);
});

module.exports = router;