var express = require("express");
var router = express.Router();

var usuarioAdminController = require("../controllers/usuarioAdminController");

router.get("/listar/:fkEmpresa", function (req, res) {
    usuarioAdminController.listar(req, res);
});

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

module.exports = router;