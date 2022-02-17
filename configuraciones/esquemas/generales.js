exports.header_esquema = {
    "type": "object",
    "properties": {
        "nombre_aplicativo": {
            "type": "string",
            "pattern": "^(?![nN][uU][lL]{2}$)\\s*\\S.*",

        },
        "identificador_usuario": {
            "type": "string",
            "pattern": "^(?![nN][uU][lL]{2}$)\\s*\\S.*",
        }
    },
    "required": [
        "nombre_aplicativo",
        "identificador_usuario"
    ]
};

exports.body_esquema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "pattern": "^(?![nN][uU][lL]{2}$)\\s*\\S.*",
        }
    },
    "required": [
        "name"
    ]
};