var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaControler");

// router.get("/listar", function (req, res) {
//     maquinaControler.listar(req, res);
// });

router.post("/cadastrarMaquina", function (req, res) {
    maquinaController.cadastrarUsuario(req, res);
})

module.exports = router;