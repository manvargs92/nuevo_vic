
var ExcelJS = require('exceljs');
const moment = require('moment-timezone');

var i ;

exports.reporteXLSX = async function(datos){
    i = 1;
    const workbook = new ExcelJS.Workbook();
    
    workbook.creator = datos.usuario.replace(/@frd.org.mx/, "");
    workbook.lastModifiedBy = datos.usuario.replace(/@frd.org.mx/, "");
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    let worksheet  = workbook.addWorksheet('Rep_Apart_Exel');

    medidasColumnas(worksheet);
    setTitulo(worksheet);
    armarWorkSheet(worksheet, datos.resultado);

    const buffer = await workbook.xlsx.writeBuffer();

    return buffer;

}

function medidasColumnas(worsheet) {
    
    let colum1 = worsheet.getColumn(1);
    colum1.width = 12;
    let colum2 = worsheet.getColumn(2);
    colum2.width = 16;
    let colum3 = worsheet.getColumn(3);
    colum3.width = 14;
    let colum4 = worsheet.getColumn(4);
    colum4.width = 14;
    let colum5 = worsheet.getColumn(5);
    colum5.width = 12;
    let colum6 = worsheet.getColumn(6);
    colum6.width = 10;
    let colum7 = worsheet.getColumn(7);
    colum7.width = 17;
    let colum8 = worsheet.getColumn(8);
    colum8.width = 12;
    let colum9 = worsheet.getColumn(9);
    colum9.width = 25;
    let colum10 = worsheet.getColumn(10);
    colum10.width = 12;

}

function setTitulo(worksheet) {

    let fecha = moment().tz('America/Mexico_City');
    worksheet.mergeCells('C'+i+':H'+i);
    let row = worksheet.getRow(i);
    let cell = row.getCell(4);
    cell.alignment = { horizontal: 'center' };
    cell.value = "Reporte de Apartados por Vencer";
    cell.font = {bold: true, size: 12};
    row.getCell(10).value = fecha.format('DD/MM/YYYY');
    row.commit();
    i++;

}

function armarWorkSheet(worksheet, datos) {

    let existencias = [];
    for(let sucursal of datos){
        if (!existencias.includes(sucursal.numero_sucursal)) {
            existencias.push(sucursal.numero_sucursal);
            setLineaBlanca();
            setSucursal(worksheet, sucursal);
            setLineaBlanca();
            setEncabezados(worksheet);
            let contratos = datos.filter(a => a.numero_sucursal == sucursal.numero_sucursal);
            for(let contrato of contratos){
                if (!existencias.includes(contrato.numero_contrato)) {
                    existencias.push(contrato.numero_contrato);
                    setContrato(worksheet, contrato);
                    let bienes = contratos.filter(a => a.numero_contrato == contrato.numero_contrato);
                    for(let bien of bienes){
                        if (!existencias.includes(bien.numero_bien)) {
                            existencias.push(bien.numero_bien);
                            setBien(worksheet, bien);
                        }
                    }
                }        
            }
        }
    }
    setLineaBlanca();
    setSumatoriasFinales(worksheet, datos);
    
}

function setSucursal(worksheet, sucursal){
 
    worksheet.mergeCells('B'+i+':C'+i);
 
    let row = worksheet.getRow(i);
    
    let cell = row.getCell(1);
    cell.value = "Sucursal:";
    cell.font = {bold: true, size: 10};
    
    row.getCell(2).value = `${sucursal.numero_sucursal} ${sucursal.nombre_sucursal}`
    
    row.commit();
    i++;
}

function setEncabezados(worksheet) {
 
    let fuente = {size: 9, bold: true};
    let bordes = {bottom: {style:'medium'}};

    let row = worksheet.getRow(i);
    
    let cell_contrato = row.getCell(1);
    cell_contrato.alignment = {horizontal: 'center'};
    cell_contrato.font = fuente;
    cell_contrato.border = bordes;
    cell_contrato.value = "No. Contrato";
    
    let cell_numbien = row.getCell(2);
    cell_numbien.alignment = {horizontal: 'center'};
    cell_numbien.font = fuente;
    cell_numbien.border = bordes;
    cell_numbien.value = "No. Bien";
    
    let cell_fechaA = row.getCell(3);
    cell_fechaA.alignment = {horizontal: 'center'};
    cell_fechaA.font = fuente;
    cell_fechaA.border = bordes;
    cell_fechaA.value = "Fecha Apartado";
    
    let cell_fechaV = row.getCell(4);
    cell_fechaV.alignment = {horizontal: 'center'};
    cell_fechaV.font = fuente;
    cell_fechaV.border = bordes;
    cell_fechaV.value = "Fecha Vencimiento";
    
    let cell_venta = row.getCell(5);
    cell_venta.alignment = {horizontal: 'center'};
    cell_venta.font = fuente;
    cell_venta.border = bordes;
    cell_venta.value = "Imp. Total Vta";
    
    let cell_pagoI = row.getCell(6);
    cell_pagoI.alignment = {horizontal: 'center'};
    cell_pagoI.font = fuente;
    cell_pagoI.border = bordes;
    cell_pagoI.value = "Pago Inicial";
    
    let cell_abonos = row.getCell(7);
    cell_abonos.alignment = {horizontal: 'center'};
    cell_abonos.font = fuente;
    cell_abonos.border = bordes;
    cell_abonos.value = "Abonos";
    
    let cell_pendiente = row.getCell(8);
    cell_pendiente.alignment = {horizontal: 'center'};
    cell_pendiente.font = fuente;
    cell_pendiente.border = bordes;
    cell_pendiente.value = "Saldo Pendiente";
    
    let cell_nombre = row.getCell(9);
    cell_nombre.alignment = {horizontal: 'center'};
    cell_nombre.font = fuente;
    cell_nombre.border = bordes;
    cell_nombre.value = "Nombre Cliente";
    
    let cell_telefono = row.getCell(10);
    cell_telefono.alignment = {horizontal: 'center'};
    cell_telefono.font = fuente;
    cell_telefono.border = bordes;
    cell_telefono.value = "Teléfono";
 
    row.commit();
    i++;
}

function setContrato(worksheet, contrato) {
    
    let fecha = [];
    let fuente = {size: 8};
    let bordes = {top: {style:'thin'}};

    let row = worksheet.getRow(i);
    
    let cell_contrato = row.getCell(1);
    cell_contrato.alignment = {horizontal: 'center'};
    cell_contrato.font = fuente;
    cell_contrato.border = bordes;
    cell_contrato.value = `${contrato.numero_contrato}`;
    
    let cell_numbien = row.getCell(2);
    cell_numbien.alignment = {horizontal: 'center'};
    cell_numbien.font = fuente;
    cell_numbien.border = bordes;
    cell_numbien.value = '';
    
    let cell_fechaA = row.getCell(3);
    cell_fechaA.alignment = {horizontal: 'center'};
    cell_fechaA.font = fuente;
    cell_fechaA.border = bordes;
    let fecha_apartado = moment(contrato.fecha_apartado);
    cell_fechaA.value = `${fecha_apartado.format('DD/MM/YYYY')}`;
        
    let cell_fechaV = row.getCell(4);
    cell_fechaV.alignment = {horizontal: 'center'};
    cell_fechaV.font = fuente;
    cell_fechaV.border = bordes;
    fecha = contrato.fecha_vencimiento.split('T')
    cell_fechaV.value = `${fecha[0]}`;
    
    let cell_venta = row.getCell(5);
    cell_venta.alignment = {horizontal: 'center'};
    cell_venta.font = fuente;
    cell_venta.border = bordes;
    cell_venta.value = `$${parseFloat(contrato.total_venta).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    
    let cell_pagoI = row.getCell(6);
    cell_pagoI.alignment = {horizontal: 'center'};
    cell_pagoI.font = fuente;
    cell_pagoI.border = bordes;
    cell_pagoI.value = `$${parseFloat(contrato.pago_inicial).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    
    let cell_abonos = row.getCell(7);
    cell_abonos.alignment = {horizontal: 'center'};
    cell_abonos.font = fuente;
    cell_abonos.border = bordes;
    cell_abonos.value = `$${parseFloat(contrato.abonos).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    
    let cell_pendiente = row.getCell(8);
    cell_pendiente.alignment = {horizontal: 'center'};
    cell_pendiente.font = fuente;
    cell_pendiente.border = bordes;
    cell_pendiente.value = `$${parseFloat(contrato.saldo_pendiente).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    
    let cell_nombre = row.getCell(9);
    cell_nombre.alignment = {horizontal: 'center'};
    cell_nombre.font = fuente;
    cell_nombre.border = bordes;
    cell_nombre.value = `${contrato.nombre_cliente}`;
    
    let cell_telefono = row.getCell(10);
    cell_telefono.alignment = {horizontal: 'center'};
    cell_telefono.font = fuente;
    cell_telefono.border = bordes;
    cell_telefono.value = `${contrato.telefono_cliente}`;

    row.commit();
    i++;
}

function setBien(worksheet, bien) {
    
    let fuente = {size: 8};
    worksheet.mergeCells('C'+i+':J'+i);
    let row = worksheet.getRow(i);
    
    let cell_bien = row.getCell(2);
    cell_bien.alignment = {horizontal: 'center'};
    cell_bien.font = fuente;
    cell_bien.value = `${bien.numero_bien}`;
    
    let cell_detalle = row.getCell(3);
    cell_detalle.font = fuente;
    cell_detalle.value = `${bien.descripcion_bien}`;
    
    row.commit();
    i++;
}

function setSumatoriasFinales(worksheet, datos) {
    let existencias = [];
    let sumas = {
        tot_bienes: datos.length,
        tot_venta: 0,
        tot_abonos: 0,
        tot_pendientes: 0
    }
    for(let contrato of datos){
        if(!existencias.includes(contrato.numero_contrato)){
            existencias.push(contrato.numero_contrato);
            sumas.tot_venta += parseFloat(contrato.total_venta);
            sumas.tot_abonos += parseFloat(contrato.abonos);
            sumas.tot_pendientes += parseFloat(contrato.saldo_pendiente);
        }
    }

    let fuente = {size: 9, bold: true}
    let row = worksheet.getRow(i);
    
    let cell_totalBienes = row.getCell(1);
    cell_totalBienes.value = "Total de Bienes:";
    cell_totalBienes.font = fuente;
    let cell_bienes = row.getCell(2);
    cell_bienes.value = sumas.tot_bienes;
    cell_bienes.alignment = {horizontal: "left"}
    cell_bienes.font = {size: 9};
    let cell_totalVenta = row.getCell(3);
    cell_totalVenta.value = "Imp Total Ventas:";
    cell_totalVenta.font = fuente;
    let cell_ventaTotal = row.getCell(4);
    cell_ventaTotal.value = `$${sumas.tot_venta.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    cell_ventaTotal.font = {size: 9};
    let cell_totalAbonos = row.getCell(5);
    cell_totalAbonos.value = "Total Abonos:";
    cell_totalAbonos.font = fuente;
    let cell_abonos = row.getCell(6);
    cell_abonos.value = `$${sumas.tot_abonos.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    cell_abonos.font = {size: 9};
    let cell_totalPendientes = row.getCell(7);
    cell_totalPendientes.value = "Total Saldo Pendiente:";
    cell_totalPendientes.font = fuente;
    let cell_pendiente = row.getCell(8);
    cell_pendiente.value = `$${sumas.tot_pendientes.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    cell_pendiente.font = {size: 9};

    i++;
}

function setLineaBlanca(){
    i++;
}