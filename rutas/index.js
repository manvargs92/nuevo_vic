var express = require('express');
var controlador = require('../controladores/controlador');
var controladorxlsx = require('../controladores/controladorXLSX');
var router = express.Router();

router.post('/generador/reportes/pdf/:tipo', controlador.crear);
router.post('/generador/reportes/xlsx/:tipo', controladorxlsx.crear);

module.exports = router;