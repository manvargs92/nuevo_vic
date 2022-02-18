
exports.fila = async function (sucursal){
    try {
      let resultado = {
        table: {
            widths: ["10%", "10%"],
            body: [
                [
                    {
                        text: "Sucursal:",
                        fontSize: 12,
                        bold: true
                    },
                    {
                        text: `${sucursal.numero_sucursal} ${sucursal.nombre_sucursal}`,
                        fontSize: 11
                    }
                ]
            ]
        },
        layout: "noBorders", 
    };
      return resultado;
    } catch (err) {
      console.log("Error: ", err);
      return null;
    }
  };
  