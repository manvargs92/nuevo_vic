exports.sumatorias = async function(datos) {
    try {

        let datos_sumatoria = {
            total_bienes: datos.length,
            total_ventas: 0,
            total_abonos: 0,
            total_saldo_pendiente: 0
        };
        let existencia = [];
        for(let contrato of datos){
            if(!existencia.includes(contrato.numero_contrato)){
                existencia.push(contrato.numero_contrato);
                datos_sumatoria.total_ventas += parseFloat(contrato.total_venta);
                datos_sumatoria.total_abonos += parseFloat(contrato.abonos);
                datos_sumatoria.total_saldo_pendiente += parseFloat(contrato.saldo_pendiente);
            }
        }

        let resultado = {
            table: {
                widths: ["13%","5%","13%","10%","13%", "10%", "18%", "10%", "8%"],
                body:[
                    [
                        {
                            text: "Total de Bienes:",
                            bold: true,
                            fontSize: 9
                        },
                        {
                            text: datos_sumatoria.total_bienes,
                            fontSize: 8
                        },
                        {
                            text: "Imp Total Venta:",
                            bold: true,
                            fontSize: 9
                        },
                        {
                            text: '$' + datos_sumatoria.total_ventas.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                            fontSize: 8
                        },
                        {
                            text: "Total Abonos: ",
                            bold: true,
                            fontSize: 9
                        },
                        {
                            text: '$' + datos_sumatoria.total_abonos.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                            fontSize: 8
                        },
                        {
                            text: "Total Saldo Pendiente:",
                            bold: true,
                            fontSize: 9
                        },
                        {
                            text: '$' + datos_sumatoria.total_saldo_pendiente.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
                            fontSize: 8
                        },
                        {
                            text: " "
                        }
                    ]
                ]
            },
            layout: "noBorders"
        };
    
        return resultado;        
    } catch (err) {
        console.log("Error: ", err);
        return null;
    }
}