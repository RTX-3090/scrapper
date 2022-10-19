const axios = require("axios");

let t = new Date().getTime();
let url =
  "https://media.tvgo.americatv.com.pe/web/live/6099b04d9418ac082441dd74/" + t;

//   -H 'authority: media.tvgo.americatv.com.pe' \
//   >   -H 'accept: application/json, text/javascript, */*; q=0.01' \
//   >   -H 'accept-language: en-US,en;q=0.9,es-US;q=0.8,es;q=0.7' \
//   >   -H 'origin: https://tvgo.americatv.com.pe' \
//   >   -H 'referer: https://tvgo.americatv.com.pe/' \
//   >   -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"' \
//   >   -H 'sec-ch-ua-mobile: ?0' \
//   >   -H 'sec-ch-ua-platform: "Windows"' \
//   >   -H 'sec-fetch-dest: empty' \
//   >   -H 'sec-fetch-mode: cors' \
//   >   -H 'sec-fetch-site: same-site' \
//   >   -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36' \
//   >   --compressed
const config = {
  headers: {
    referer: "https://tvgo.americatv.com.pe/",
    origin: "https://tvgo.americatv.com.pe",
    authority: "media.tvgo.americatv.com.pe",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
  },
};

axios
  .get(url, config)
  .then((res) => {
    console.log(`statusCode: ${res.status}`);
    console.log(res.data.access_token);
    console.info(
      "https://mdstrm.com/live-stream/6099b04d9418ac082441dd74?jsapi=true&autoplay=true&audio=1&player=60c2a74e0f4668082e309af4&ref=https://tvgo.americatv.com.pe/&access_token=" +
        res.data.access_token
    );
  })
  .catch((error) => {
    console.error(error);
  });
