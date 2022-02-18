const moment = require('moment-timezone');
async function encabezados() {
    let resultado = [
        {
            text: "No. Contrato",
            fontSize: 9,
            bold: true,
            alignment: "center",
            border: []
        },
        {
            text: "No. Bien",
            fontSize: 9,
            bold: true,
            alignment: "center",
            border: []
        },
        {
            text: "Fecha Apartado",
            fontSize: 9,
            bold: true,
            alignment: "center",
            border: []
        },
        {
            text: "Fecha Vencimiento",
            fontSize: 9,
            bold: true,
            alignment: "center",
            border: []
        },
        {
            text: "Imp. Total Vta",
            fontSize: 9,
            bold: true,
            alignment: "center",
            border: []
        },
        {
            text: "Pago inicial",
            fontSize: 9,
            bold: true,
            alignment: "center",
            border: []
        },
        {
            text: "Abonos",
            fontSize: 9,
            bold: true,
            alignment: "center",
            border: []
        },
        {
            text: "Saldo Pendiente",
            fontSize: 9,
            bold: true,
            alignment: "center",
            border: []
        },
        {
            text: "Nombre Cliente",
            fontSize: 9,
            bold: true,
            alignment: "center",
            border: []
        },
        {
            text: "Teléfono",
            fontSize: 9,
            bold: true,
            alignment: "center",
            border: []
        },
    ];

    return resultado;
}

async function filaContrato(contrato){
    let fecha_a = moment(contrato.fecha_apartado);
    let fecha_v = contrato.fecha_vencimiento.split('T');
    let resultado = [
        {
            text: contrato.numero_contrato,
            fontSize: 8,
            alignment: "center",
            border: [false, true, false, false]
        },
        {
            text: " ",
            fontSize: 8,
            alignment: "center",
            border: [false, true, false, false]
        },
        {
            text: fecha_a.format('DD/MM/YYYY'),
            fontSize: 8,
            alignment: "center",
            border: [false, true, false, false]
        },
        {
            text: fecha_v[0],
            fontSize: 8,
            alignment: "center",
            border: [false, true, false, false]
        },
        {
            text: `$${parseFloat(contrato.total_venta).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`,
            fontSize: 8,
            alignment: "center",
            border: [false, true, false, false]
        },
        {
            text: `$${parseFloat(contrato.pago_inicial).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`,
            fontSize: 8,
            alignment: "center",
            border: [false, true, false, false]
        },
        {
            text: `$${parseFloat(contrato.abonos).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`,
            fontSize: 8,
            alignment: "center",
            border: [false, true, false, false]
        },
        {
            text: `$${parseFloat(contrato.saldo_pendiente).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`,
            fontSize: 8,
            alignment: "center",
            border: [false, true, false, false]
        },
        {
            text: contrato.nombre_cliente,
            fontSize: 8,
            alignment: "center",
            border: [false, true, false, false]
        },
        {
            text: contrato.telefono_cliente,
            fontSize: 8,
            alignment: "center",
            border: [false, true, false, false]
        },
    ];
    return resultado;
}

async function filaBienes(cuerpo, bienes) {
    for(let bien of bienes){
        let fila = [
            {
                text: "",
                fontSize: 8,
                alignment: "center",
                border: []
            },
            {
                text: bien.numero_bien,
                fontSize: 8,
                alignment: "center",
                border: []
            },
            {
                text: bien.descripcion_bien,
                fontSize: 8,
                alignment: "justify",
                colSpan: 8,
                border: [false, false, false, false]
            },{},{},{},{},{},{},{}
        ];
        cuerpo.push(fila)
    }
    
    return cuerpo;
}

exports.tablaContratos = async function (contratos){
    try {
      let cuerpo = [];
      let existencia = [];
      cuerpo.push(await encabezados());
      for(let contrato of contratos){
        if(!existencia.includes(contrato.numero_contrato)){
            existencia.push(contrato.numero_contrato);
            cuerpo.push(await filaContrato(contrato));
            let bienes = contratos.filter(element => element.numero_contrato == contrato.numero_contrato);
            cuerpo = await filaBienes(cuerpo, bienes);
        }
      }
      let resultado = {
        table: {
            widths: ["7%","14%","9%","9%","10%","10%","10%","10%","12%","9%"],
            body: cuerpo
        }
    };
      return resultado;
    } catch (err) {
      console.log("Error: ", err);
      return null;
    }
  };
  