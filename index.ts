import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as p from 'path';

const server = http.createServer();
const publicDir = p.relative(__dirname, 'public');

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const {method, url, headers} = request;
  switch (url) {
    case '/index.html':
      response.setHeader('Content-type', 'text/html; charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'index.html'), (err, data) => {
        if (err) {
          throw err;
        }
        response.end(data.toString());
      });
      break;
    case '/style.css':
      //告知浏览器内容为css
      response.setHeader('Content-type', 'text/css; charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'style.css'), (err, data) => {
        if (err) {
          throw err;
        }
        response.end(data.toString());
      });
      break;
    case '/main.js':
      response.setHeader('Content-type', 'text/javascript; charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'main.js'), (err, data) => {
        if (err) {
          throw err;
        }
        response.end(data.toString());
      });
      break;
  }
});

server.listen(8888);
