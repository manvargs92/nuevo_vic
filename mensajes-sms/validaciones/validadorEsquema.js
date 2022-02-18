let validador = require('jsonschema').Validator;
let v = new validador();
var fs = require('fs');

//const esquema = JSON.parse(fs.readFileSync('./recursos/schema.json'));

module.exports = async (data, esquema) => {
    let detalles = [];
    let response = { "statusCode": 200 };
    try {
        let esquema_validacion = await v.validate(data, esquema);
        if (esquema_validacion.valid) {
            console.log("Eval schema: ok");
            return Promise.resolve(response);
        } else {
            console.log("Schema no válido");
            response.statusCode = 400;
            for (let item of esquema_validacion.errors) {
                console.log(JSON.stringify(item));
                detalles.push(item.stack);
            }
             response.body = {
                error: detalles
            }
            return Promise.reject(response);
        }

    } catch (error) {
        console.log("Error Squema Validate - SyntaxError: ", error);
        response.statusCode = 400;
        response.body = "BAD REQUEST";
        return Promise.reject(response);
    }
};