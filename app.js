var http = require('http');

var server = http.createServer(function(request, response) {
    response.writeHead(200, {
        // headers here
        'Content-type' : 'text/plain'
    });
    response.write('Hello World');
    response.end();
});

server.listen(80);

console.log('Listening on http://localhost:80');