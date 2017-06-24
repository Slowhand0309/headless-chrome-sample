'use strict';

const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');
const Screenshot = require('./screenshot');
const Dump = require('./dump');

chromeLauncher.launch({
  port: 9222,
  chromeFlags: ['--headless', '--disable-gpu']
}).then(chrome => {
  console.log(`Chrome debugging port running on ${chrome.port}`);

  CDP((client) => {
    
    const url = 'https://github.com';
    
    client.Page.enable()
      .then(() => {
        return client.Page.navigate({ url: url });
      })
      .then(() => {
        client.Page.loadEventFired(() => {
          // all task execute
          Promise.all([
            Dump.d(client, url),
            Screenshot.takeScreen(client, url) // Not working at headless mode...
          ]).then(() => {
            client.close();
            chrome.kill();
          });
        });
      });
      
  }).on('error', (err) => {
    console.error(err);
  });
});
