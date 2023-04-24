

import Fixed from "../macro/fixed.js";
import Unary from "../macro/unary.js";
import Binary from "../macro/binary.js";

// more mathematics unicode as tex source code style


export const ExtensionLoader = {

  load: function (extension) {
    const { fixed, unary, binary } = extension
    fixed && Object.keys(fixed).forEach(x => Fixed[x] = fixed[x])
    unary && Object.keys(unary).forEach(x => Unary[x] = unary[x])
    binary && Object.keys(binary).forEach(x => Binary[x] = binary[x])
  },

  // except link format `https://xxx/xxxx.js`
  loadHttpResponse: function (link) {
    if (XMLHttpRequest != undefined) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", link, false);
      xmlhttp.send();
      if (xmlhttp.status == 200)
        ExtensionLoader.load(xmlhttp.responseText)
    }
  }

}


