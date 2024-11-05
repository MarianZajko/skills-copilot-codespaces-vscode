// Create web server 
// Start server and send back comments

var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

http.createServer(function(req, res){
    var path = url.parse(req.url).pathname;
    console.log(path);

    if(path == '/'){
        fs.readFile(__dirname + '/comment.html', function(err, data){
            if(err){
                console.log(err);
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write('Page not found');
                return res.end();
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else if(path == '/comment'){
        var data = '';
        req.on('data', function(chunk){
            data += chunk;
        });
        req.on('end', function(){
            var comment = querystring.parse(data);
            console.log(comment);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('Name: ' + comment['name'] + '<br>Comment: ' + comment['comment']);
            return res.end();
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('Page not found');
        return res.end();
    }
}).listen