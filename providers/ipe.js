const scrapeIt = require("scrape-it");
const moment = require("moment");
const fs = require('fs');

// Promise interface
scrapeIt("https://www.canalipe.tv/horarios", {
  programme: {
    listItem: "#content-parrilla > .b12-item",
    data: {
      title: ".b12-info .b12-titulo a",
      desc: ".b12-descripcion",
      category: "GENERAL",
      icon: {
        selector: ".b12-img > a > img",
        attr: "src",
      },
      start: {
        selector: ".b12-horario",
        convert: (x) => moment(x, "HH:mm").format("YYYYMMDDHHmmss")+ ' +0000',
      },
    },
  },
}).then(({ data, response }) => {
    console.log(`Status Code: ${response.statusCode}`);
    console.log(data);
    fs.promises.writeFile('./dist/ipe.js','module.exports = ' + JSON.stringify(data,null,2),'utf-8')
});
