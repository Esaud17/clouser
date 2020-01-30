var scraperjs = require("scraperjs");
var converter = require("convert-array-to-csv");
var fs = require("fs");

var requets = {
  URL: "https://www.sito.com/"
};

(function(datos) {
  scraperjs.StaticScraper.create()
    .request({
      url: datos.URL,
      encoding: "binary"
    })
    .scrape(function($) {
      return $("#cotizacion  ul li span")
        .map(function() {
          return $(this).text();
        })
        .get();
    })
    .then(function(news) {
      var item = {};
      
      item.euro = (news[1] * news[0]).toFixed(4) * 1;
      item.dolar = (1 * news[0]).toFixed(4) * 1;

      var csv = converter.convertArrayToCSV([[item.dolar, item.euro]], {
        header: ["DOLAR", "EURO"],
        separator: ";"
      });

      fs.writeFile("Monedas.csv", csv, "utf-8", function(err) {
        if (err) throw err;
        console.log("Obtuvo la moneda");
      });

      console.log(item);
    });
})(requets);
