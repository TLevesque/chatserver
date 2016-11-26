
const fs = require('fs');
const path = require('path');

const notFound = fs.readFileSync('./static/404.html', 'utf8');
const dbFilePath = './db.json';
const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
setInterval(function () {
  fs.writeFile(dbFilePath, JSON.stringify(db), function () {});
}, 5000);

function router (req, res) {

  if (req.method === 'POST') {
    // General body parser on POST requests
    const body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      req.body = JSON.parse(Buffer.concat(body).toString());
    });
  }

  if (req.url === '/messages' && req.method === 'GET') {
    // GET messages
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.msgs));

  } else if (req.url === '/messages' && req.method === 'POST') {
    // POST message
    req.on('end', function () {
      db.msgs.push(req.body);
      res.end();
    });
  } else {

    // Catchall for static files
    let filePath = 'static' + req.url;
    if (filePath === 'static/') filePath = 'static/client.html';

    fs.readFile(filePath, function(err, data) {
      if (err) {
        if (err.code === 'ENOENT') res.end(notFound, 'utf-8');
        else {
          res.writeHead(500);
          res.end('Sorry, check with the site admin for err: ' + err.code + ' ..\n');
          res.end();
        }
      } else {
        res.end(data, 'utf-8');
      }
    });

  }
}

module.exports = router;
