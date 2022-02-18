var fs = require("fs");
var logger = require("../funciones/utilerias/logger");
// var config_valida = require('../configuraciones/config_validacion.json');
// var esquema = require('../funciones/validaciones/esquema');
var { HTTP_CODIGOS } = require("../configuraciones/codigos_http");
var xlsx = require("json-as-xlsx");

var apartados_por_devolver = require("../funciones/plantillas/apartadosPorVencerXLSX");

exports.crear = async (req, res) => {
  let parametros = {
    query: req.query,
    path: req.params,
    body: req.body,
    headers: req.headers,
  };

  let respuesta;
  let respuesta_json = JSON.parse(
    fs.readFileSync("configuraciones/respuesta.json")
  );

  try {
    let nombre_archivo;
    switch (req.params.tipo) {
        case "apartados_por_vencer":
            nombre_archivo = "ReporteApartadosporVencer";
            respuesta = await apartados_por_devolver.reporteXLSX(req.body);
            break;
    
        default:
            break;
    }

    res.setHeader("Content-type", "application/xlsx");
    res.setHeader("content-disposition", "attachment; filename=" + nombre_archivo + "_" + Date.now() + ".xlsx");
    res.status(HTTP_CODIGOS._200.estatus).send(respuesta);

  } catch (err) {

    logger.error("Error en búsqueda: " + err);
    respuesta_json.codigo = HTTP_CODIGOS._500.contexto._101.codigo;
    respuesta_json.mensaje = HTTP_CODIGOS._500.contexto._101.mensaje;
    respuesta_json.errores.push(err.message);
    res.status(HTTP_CODIGOS._500.estatus).send(respuesta_json);
    return;
    
  }
};
