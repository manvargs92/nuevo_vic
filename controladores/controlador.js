var fs = require('fs');
var logger = require('../funciones/utilerias/logger');
// var config_valida = require('../configuraciones/config_validacion.json');
// var esquema = require('../funciones/validaciones/esquema');
var { HTTP_CODIGOS } = require('../configuraciones/codigos_http');
var PdfPrinter = require("pdfmake");

var apartados_por_devolver = require('../funciones/plantillas/apartadosPorVencer');

var fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique"
    }
  };
  
  var printer = new PdfPrinter(fonts);

exports.crear = async (req, res) => {
    let parametros = {
        'query': req.query,
        'path': req.params,
        'body': req.body,
        'headers': req.headers
    };

    let respuesta;
    let respuesta_json = JSON.parse(fs.readFileSync('configuraciones/respuesta.json') );
	//Cambio para desplegar.
    try {
        
        switch (req.params.tipo) {
            case "apartados_por_vencer":
                
                respuesta = await apartados_por_devolver.estructuraPDF(req.params.tipo, req.body);
                pdf = printer.createPdfKitDocument(respuesta);

                break;
        
            default:
                break;
        }

        pdf.end();

        res.setHeader("Content-type", "application/pdf");
        res.setHeader("content-disposition", "attachment; filename=" + req.params.tipo + "_" + Date.now() + ".pdf");
        pdf.pipe(res);
    } catch (err) {
        logger.error('Error en búsqueda: ' + err);
        respuesta_json.codigo = HTTP_CODIGOS._500.contexto._101.codigo;
        respuesta_json.mensaje = HTTP_CODIGOS._500.contexto._101.mensaje;
        respuesta_json.errores.push(err.message);
        res.status(HTTP_CODIGOS._500.estatus).send(respuesta_json);
        return;
    }
}
