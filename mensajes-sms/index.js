let AWS = require('aws-sdk');
const sns = new AWS.SNS();
const fs = require('fs');
const valSchema = require('./validaciones/validadorEsquema');

exports.notificar = async function (event) {
    let req;
    try {
        if (event.headers === undefined) {
            req = event;
        } else {
            req = JSON.parse(event.body);
        }

        console.log('Request:' + JSON.stringify(req));
        const esquema = JSON.parse(fs.readFileSync('./recursos/schema.json')).sms;
        await valSchema(req, esquema);

        if(req.receptor.length === 10)
            req.receptor = "52" + req.receptor;
	  
        console.log("Enviando SMS: ", req.mensaje, ", al receptor: ", req.receptor);

        return await sns.publish({
                Message: req.mensaje,
                MessageAttributes: {
                        'AWS.SNS.SMS.SMSType': {
                            DataType: 'String',
                            StringValue: 'Promotional'
                        },
                        'AWS.SNS.SMS.SenderID': {
                            DataType: 'String',
                            StringValue: 'Wanashop'
                        },
                },
                PhoneNumber: req.receptor
        }).promise()
			 .then(data => {
                    console.log("SMS enviado");	
                    return {
                        statusCode: 200,
                        body: JSON.stringify({
                            data
                        }),
                    };				
			 })
			 .catch(err => {
                    console.log("Error en el envío del SMS: " + err);
                    return {
                        statusCode: 500,
                        body: JSON.stringify({
                            "mensaje": err.message
                        })
             };				
		});

        
    } catch (e) {
        console.log('Error en index: ' + e);
        let error = e.body || e;
        return {
            statusCode: e.statusCode || 500,
            body: JSON.stringify(error)
        }
    }
};
