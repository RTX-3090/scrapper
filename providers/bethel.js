const scrapeIt = require("scrape-it");
const moment = require("moment");
const fs = require('fs');

// Promise interface
scrapeIt("https://mi.tv/pe/async/channel/bethel/-300", {
  programme: {
    listItem: "ul.time24 > li",
    data: {
      title: ".content h2",
      desc: ".content .synopsis",
      category: ".content .sub-title",
      icon: {
        selector: ".image",
        attr: "style",
        convert: (x) => {
          return x.substring(23,(x.length - 2));
        },
      },
      start: {
        selector: ".content span.time",
        convert: (x) => moment(x, "HH:mm").format("YYYYMMDDHHmmss") + ' +0000',
      },
    },
  },
}).then(({ data, response }) => {
  console.log(`Status Code: ${response.statusCode}`);
  console.log(data);
  fs.promises.writeFile('./dist/bethel.js','module.exports = ' + JSON.stringify(data,null,2),'utf-8')
});
