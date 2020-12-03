import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';

const server = http.createServer();
const publicDir = p.relative(__dirname, 'public');
let cacheAge = 3600 * 24 * 365

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const {method, url: path, headers} = request;
  //处理查询参数用url.parse
  const {pathname, search} = url.parse(path);
  //处理请求问题
  if(method === 'POST') {
    response.statusCode = 405;
    response.end();
    return
  }
  response.setHeader('Content-type', 'text/html; charset=utf-8');
  let filename = pathname.substr(1);
  if (filename === '') {
    filename = 'index.html';
  }
  fs.readFile(p.resolve(publicDir, filename), (err, data) => {
    if (err) {
      if (err.errno === -4058) {
        response.statusCode = 404;
        fs.readFile(p.resolve(publicDir, '404.html'), (err, data) => {
          response.end(data);
        });
        response.end('你要的文件不存在');
      } else {
        response.statusCode = 500;
        response.end('服务器繁忙');
      }
    } else {
      //返回文件内容
      response.setHeader('Cache-control',`public, max-age=${cacheAge}`)
      response.end(data);
    }
  });
});

server.listen(8888);
