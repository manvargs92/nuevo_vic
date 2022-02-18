var winston = require('winston');
require('winston-daily-rotate-file');
var moment = require('moment-timezone');
var packageJson = require('../../package.json');
const { splat, combine, timestamp, printf } = winston.format;
var os = require("os");
var hostname = os.hostname();
var httpContext = require('express-http-context');
var myFormat = printf(({ timestamp, level, message, meta }) => {
    let id_tracking = httpContext.get('id_tracking');
    let fecha = moment().tz('America/Mexico_City');
    return `${fecha.format('YYYY-MM-DD HH:mm:ss')}|${level}|${id_tracking}|${message}${meta ? JSON.stringify(meta) : ''}`;
});
const transports = {
    console: new winston.transports.Console(
        {
            level: 'info',
            handleExceptions: true,
            colorize: true
        }),
    file: new (winston.transports.DailyRotateFile)(
        {
            filename: './logs/' + packageJson.name + '/%DATE%' + "_" + packageJson.name + '_' + hostname + '.log',
            datePattern: 'YYYY-MM-DD',
            level: 'debug',
            zippedArchive: true,
            maxSize: '20m'
        })
};

const logger = winston.createLogger({
    format: combine(
        timestamp(),
        splat(),
        myFormat
    ),
    transports: [
        transports.console,
        transports.file
    ]
});

module.exports = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};