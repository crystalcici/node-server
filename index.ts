import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';

const server = http.createServer();
const publicDir = p.relative(__dirname, 'public');

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const {method, url: path, headers} = request;
  //处理查询参数用url.parse
  const {pathname, search} = url.parse(path);
  // response.setHeader('Content-type', 'text/html; charset=utf-8');
  const filename = pathname.substr(1);

  fs.readFile(p.resolve(publicDir, filename), (err, data) => {
    if (err) {
      response.statusCode = 404;
      response.end();
    } else {
      response.end(data.toString());
    }
  });
});

server.listen(8888);
