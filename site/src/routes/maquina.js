var express = require("express");
var router = express.Router();

var maquinaControler = require("../controllers/maquinaControler");

// router.get("/listar", function (req, res) {
//     maquinaControler.listar(req, res);
// });

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

module.exports = router;