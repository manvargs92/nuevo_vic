require('../../configuraciones/config');
const { Client } = require('pg');
const dbConfig = global.gConfig.database_config_pg;

exports.consultar = async function (req) {
    return new Promise(async (resolve, reject) => {

        let client;

        try {
            client = new Client(dbConfig);
            await client.connect();

            // let columnas = '*';
            // let tabla = '';
            // let parametros = {};
            // let query = `SELECT ${columnas} FROM ${tabla}`;
            // let resultado = await client.query(query, parametros);
            // resolve(resultado.rows);

            resolve([]);
        } catch (err) {
            reject(err);
        } finally {
            if (client){
                await client.end();
            }
        }
    });
};