// require all the modules needed in one place
const http = require('http'),
    fs = require('fs'),
    url = require('url');

// create the server
http.createServer((request, response) => {
    let addr = request.url,
        q = new URL(addr, 'http://' + request.headers.host),
        filePath = '';

    // log the server request    
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Added to log.');
        }
    });

    // add new complete pathname to filePath variable (or redirect to index.html)
    if (q.pathname.includes('documentation')) {
        filePath = (__dirname + '/documentation.html');
    } else {
        filePath = 'index.html';
    }

    // based on filePath, get the appropriate file from the server and send it back 
    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });

}).listen(8080);

console.log('My first Node test server is running on Port 8080.');