var scraperjs = require('scraperjs');
var converter = require("convert-array-to-csv");
var fs = require("fs");

var requets = {
    URL: 'http://dominio/see/busqueda.php?pagina=',
    page: 1,
    total:1748,
    substring: {
        start: 3835,
        end: 6974,
        status: true
    }
};

var dataframe = [];
(function (datos) {
    scraperjs.StaticScraper.create()
    .request({ url: datos.URL + datos.page, encoding: "binary" })
    .scrape(function ($) {
        return $("#id_link_auto_codigos + script").map(function () {
            return $(this).text();
        }).get();
    })
    .then(function (news) {

        var parametros  = [];
        var transform = {
            end :  requets.substring.end,
            start: requets.substring.start
        };

        do
        { 
            try {
                var script = news[0].substring(transform.start, transform.end);
                parametros = eval(script);
                parametros = eval("(function (){ " + script + " return centros; })()");
                requets.substring.status = false;
            } catch (error) {
                requets.substring.status = true;
                transform.end -= 1;
            }
        } while (requets.substring.status)
        
        dataframe = dataframe.concat(parametros);
        requets.page++;
        
        if (requets.page <= requets.total) {
          scrper(requets);
        }else{

            var csv = converter.convertArrayToCSV(dataframe, {
              header: [
                "CODARRAY",
                "CODSACE",
                "CENTRO",
                "DIRECCION",
                "TELEFONO",
                "CELULAR",
                "EMAIL",
                "CODADMIN",
                "CODDEPTO"
              ],
              separator: ";"
            });

            fs.writeFile("datos.csv", csv, "utf-8", function(err) {
              if (err) throw err;
              console.log("datos.csv");
            });

        }
    });
})(requets);