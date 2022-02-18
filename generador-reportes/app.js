var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./rutas');
var logger = require('morgan');
var puerto = process.env.port || 8080;
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');
var cors = require('cors')

app.use(cors());
app.use(bodyParser.json({limit: '20mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.disable('x-powered-by');

app.get('/', (req, res) => res.send(''));

app.use('/wanashop', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(puerto, () => console.log('Generador_PDF_Reportes: ' + puerto))

module.exports = {
    app
};