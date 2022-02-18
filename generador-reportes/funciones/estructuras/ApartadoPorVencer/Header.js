
exports.header = async function (urlImagen, fecha){
  try {
    let resultado = {
      table: {
        widths: ["30%", "40%", "30%"],
        body: [
          [
            {
              table: {
                widths: ["100%"],
                body: [
                  [
                    {
                      image: urlImagen,
                      fit: [100, 100],
                      alignment: "center",
                      rowSpan: 3,
                    },
                  ],
                  [],
                  [],
                ],
              },
              layout: "noBorders",
            },
            {
              table: {
                widths: ["100%"],
                body: [
                  [
                    {
                      text: " ",
                    },
                  ],
                  [
                    {
                      text: " ",
                    },
                  ],
                  [
                    {
                      text: " ",
                    },
                  ],
                  [
                    {
                      text: " ",
                    },
                  ],
                  [
                    {
                      text: "Reporte de Apartados por Vencer",
                      alignment: "center",
                      bold: true,
                      fontSize: 16,
                    },
                  ],
                ],
              },
              layout: "noBorders",
            },
            {
              table: {
                widths: ["100%"],
                body: [
                  [
                    {
                      text: " ",
                    },
                  ],
                  [
                    {
                      text: " ",
                    },
                  ],
                  [
                    {
                      text: " ",
                    },
                  ],
                  [
                    {
                      text: fecha,
                      alignment: "right",
                    },
                  ],
                  [
                    {
                      text: " ",
                    },
                  ],
                ],
              },
              layout: "noBorders",
            },
          ],
        ],
      },
      layout: "noBorders",
    };
    return resultado;
  } catch (err) {
    console.log("Error: ", err);
    return null;
  }
};
