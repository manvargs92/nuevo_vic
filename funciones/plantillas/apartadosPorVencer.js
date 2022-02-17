var fs = require("fs");

const header = require('../estructuras/ApartadoPorVencer/Header');
const fila_sucursal = require('../estructuras/ApartadoPorVencer/FilaSucursal');
const tabla_contratos = require('../estructuras/ApartadoPorVencer/TablaContratos');
const sumatorias = require('../estructuras/ApartadoPorVencer/Sumatorias');
const moment = require('moment-timezone');

async function filaSucursal(content, sucursales){
    let existencia = [];
    for(let sucursal of sucursales){
        if(!existencia.includes(sucursal.numero_sucursal)){
            existencia.push(sucursal.numero_sucursal);
            let contratos_sucursal = sucursales.filter(element => element.numero_sucursal == sucursal.numero_sucursal);
            content.push({text: " "});
            content.push(await fila_sucursal.fila(sucursal));
            content.push({text: " "});
            content.push(await tabla_contratos.tablaContratos(contratos_sucursal));
        }
    }
    return content;
};

exports.estructuraPDF = async function (tipoPdf, request) {

    let estructura;
    let content = [];

    let sucursales = request.resultado;
    let fecha = moment().tz('America/Mexico_City');    
    content.push(await header.header("./recursos/img/logo-fundacion.png", fecha.format('DD/MM/YYYY')));
    content = await filaSucursal(content, sucursales);
    content.push({text: " "});
    content.push(await sumatorias.sumatorias(sucursales));
    
    estructura = {
        pageOrientation: "landscape",
        pageSize: "LETTER",
        pageMargins: [ 5, 25, 5, 25 ],
        content: content
    };

    estructura.footer = function (currentPage, pageCount) {
        var columns = [{
            text: request.usuario.replace(/@frd.org.mx/, "") + ' - ' + request.fecha,
            alignment: 'left',
            margin: [40, 0, 0, 0],
            padding: [0, 0, 0, 0],
            fontSize: 9
        },
        {
            text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
            alignment: 'right',
            margin: [0, 0, 40, 0],
            padding: [0, 0, 0, 0],
            fontSize: 9
        }
        ];
        return columns;
    };
    estructura.styles = {
        header: {
            bold: true,
            margin: [0, 2, 0, 0]
        },
        subheader: {
            margin: [0, 2, 0, 2]
        },
        tableExample: {
            margin: [0, 2, 0, 2]
        },
        tableContentData: {
            bold: true,
            color: 'black',
            margin: [0, 0, 0, 0],
            padding: [0, 0, 0, 0]
        },
        tablePriceData: {
            bold: true,
            margin: [0, 0, 0, 0],
            alignment: 'right'
        },
        tableContentDataOperacion: {
            margin: [0, 25, 0, 0]
        },
        tableContentTalonEntrega: {
            fontSize: 8,
            color: 'black'
        },
        leyenda: {
            fontSize: 8,
            color: 'black'
        },
        tableTalon: {
            margin: [0, 0, 0, 0],
            padding: [0, 0, 0, 0]
        },
        piePagina: {
            bottom: true,
            fontSize: 7
        },
        codBarrasMenor: {
            margin: [0, 0, 0, 5]
        },
        detalleHeader: {
            bold: true
        },
        subheaderTicketSimplificado: {
            fontSize: 8 ,
            color: 'black',
            margin: [0, 0, 0, 0],
            padding: [0, 0, 0, 0]
        },
        subheaderTicketSimplificadoL: {
            fontSize: 8,
            bold: true,
            color: 'black',
            align: 'left'
        },
        headerTicketSimplificado: {
            bold: true,
            fontSize: 8,
            color: 'black'
        }
    };
    estructura.defaultStyle = {
        font: 'Helvetica'
    };

    return estructura;
}
