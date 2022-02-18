var fs = require('fs');
let NodeRSA = require('node-rsa');

exports.desencriptar = function (dato) {
    let key = new NodeRSA();
    let privada = fs.readFileSync('configuraciones/private.pem');
    key.importKey(privada);
    let desencriptado = key.decrypt(dato, 'utf8');

    return desencriptado;
}