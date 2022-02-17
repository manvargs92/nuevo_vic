const lodash = require('lodash');
var funcion = require('../funciones/utilerias/desencriptar');
var logger = require("../funciones/utilerias/logger");

const conexion = require('./conexion.json');
const default_config = conexion.desarrollo;
const environment = process.env.NODE_ENV || 'desarrollo';
const environment_config = conexion[environment];

environment_config.database_config_pg.database = funcion.desencriptar(environment_config.database_config_pg.database);
environment_config.database_config_pg.user = funcion.desencriptar(environment_config.database_config_pg.user);
environment_config.database_config_pg.password = funcion.desencriptar(environment_config.database_config_pg.password);

//environment_config.database_config_mssql.database = funcion.desencriptar( environment_config.database_config_mssql.database);
//environment_config.database_config_mssql.user = funcion.desencriptar( environment_config.database_config_mssql.user);
//environment_config.database_config_mssql.password = funcion.desencriptar( environment_config.database_config_mssql.password);

const final_config = lodash.merge(default_config, environment_config);

global.gConfig = final_config;

logger.debug('Environment configurado: ' + environment)