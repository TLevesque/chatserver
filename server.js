'use strict';

const http = require('http');

const router = require('./router.js');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(router);

server.listen(port, hostname, () => {
  console.log(`Hamster running in port ${hostname}:${port}`);
});
