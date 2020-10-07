// Run with 
// node clearNodeServer.js

const http = require('http');

//create a server object:
http.createServer(function(req, res) {
    const url = req.url;

    if (url === '/contact') {
        res.setHeader('Content-Type', 'application/json'); //'Content-Type': 'text/html'
        res.write('<h1>contact us page<h1>'); //write a response
        res.end(); //end the response
    } else if (url.startsWith('/user') && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({id: url.slice(6)}));
    } else {
        res.writeHead(201, {'Content-Type': 'text/html'}); // http header
        res.write('<h1>Hello World!<h1>'); //write a response
        res.end(); //end the response
    }
}).listen(3000, () => {
    console.log('server start at port 3000'); //the server object listens on port 3000
});
