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

module.exports = router;