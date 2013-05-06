var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;
    console.log("Got my URI");
    var filename = path.join(process.cwd(), uri);
    console.log("Got Me Filename:");
    console.log(filename);
    //if(filename[(filename.length()-1)] == '\\'){
    //    console.log("filename is dir");
    //    filename = filename + 'index.html';
    //    console.log("new filename:" + filename);
    //}
    fs.exists(filename, function(exists) {
        if(!exists) {
            console.log("not exists: " + filename);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('404 Not Found\n');
            res.end();
            return;
        }
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        res.writeHead(200, {'Content-Type':mimeType});

        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);

    }); //end path.exists
}).listen(1337);
