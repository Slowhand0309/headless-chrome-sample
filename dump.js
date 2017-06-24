'use strict';

class Dump {
  
  static d(client, url) {
    return new Promise((resolve, reject) => {
      client.Runtime.evaluate({expression: 'document.body.outerHTML'}).then((result) => {
        console.log(result.result.value);
        resolve();
      });
    });
  }
}

module.exports = Dump;
