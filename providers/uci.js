const scrapeIt = require("scrape-it");
const moment = require("moment");
const fs = require('fs');

// Promise interface
scrapeIt("https://uci.pe/programacion", {
  programme: {
    listItem: "div.container > .mb-3",
    data: {
      title: "h4.mb-1",
      desc: "p.card-text",
      category: "GENERAL",
      icon: {
        selector: "a > img",
        attr: "src",
      },
      start: {
        selector: "div.h3",
        convert: (x) => moment(x, "HH:mm 'HRS'").format("YYYYMMDDHHmmss")+ ' +0000',
      },
    },
  },
}).then(({ data, response }) => {
    console.log(`Status Code: ${response.statusCode}`);
    console.log(data);
    fs.promises.writeFile('./dist/uci.js','module.exports = ' + JSON.stringify(data,null,2),'utf-8')
});
