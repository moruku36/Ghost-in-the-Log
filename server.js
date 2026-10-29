import http from 'node:http';
import {readFile} from 'node:fs/promises';
import handler from './api/analyze.js';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{
  if(req.url === '/api/analyze') {
    let raw=''; for await (const chunk of req) { raw+=chunk; if(raw.length>1024){res.writeHead(413);return res.end();} }
    try { req.body=JSON.parse(raw); } catch { req.body=null; }
    res.status=code=>(res.statusCode=code,res); res.json=data=>{res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify(data));};
    return handler(req,res);
  }
  const paths={'/':'index.html','/style.css':'style.css','/app.js':'app.js','/room.svg':'room.svg'};
  const file=paths[req.url]; if(!file){res.writeHead(404);return res.end();}
  try {const data=await readFile(new URL(`./public/${file}`,import.meta.url));res.writeHead(200,{'Content-Type':types[file.slice(file.lastIndexOf('.'))]});res.end(data);} catch {res.writeHead(500);res.end();}
}).listen(43123,'127.0.0.1',()=>console.log('Ghost Logbook: http://127.0.0.1:43123'));
