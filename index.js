const builder = require("xmlbuilder");
const fs = require("fs");

const ipe = require("./dist/ipe");
const bethel = require("./dist/bethel");
const uci = require("./dist/uci");

let xml = builder.create("tv");

let processProvider = function(provider, name, xml){
  provider.programme.forEach((item, i) => {
    next = !provider.programme[i + 1] ? item : provider.programme[i + 1];
    xml
      .ele("programme", {
        start: item.start,
        stop: next.start,
        channel: name,
      })
      .ele("title", { lang: "es" }, item.title)
      .up()
      .ele("desc", { lang: "es" }, item.desc)
      .up()
      .ele("icon", { src: item.icon.replace('&','&amp;') });
  });
}

processProvider(bethel,"BethelTV.pe",xml);
processProvider(uci,"UCI.pe",xml);
processProvider(ipe,"IPE.pe",xml);

var resp = xml.end({ pretty: true });

console.log(resp);
fs.promises.writeFile("./dist/guide.xml", resp, "utf-8");
