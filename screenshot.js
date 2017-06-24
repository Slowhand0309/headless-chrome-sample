'use strict';
const fs = require('fs');

class Screenshot {
  
  static takeScreen(client, url) {
    return new Promise((resolve, reject) => {
      // take screenshot.
      client.Page.captureScreenshot().then((v) => {
        let filename = `screenshot-${Date.now()}.png`;
        fs.writeFileSync(filename, v.data, 'base64');
        resolve();
      }).catch((err) => reject(err));
    });
  }
}

module.exports = Screenshot;
