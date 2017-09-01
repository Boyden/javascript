var http = require('http');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
    var post = '';

    req.on('data', function(chunk) {
        post += chunk;
        console.log(chunk);
    });

    req.on('error', (err) => {
        // This prints the error message and stack trace to `stderr`.
        console.error(err.stack);
    });

    req.on('end', function() {
        post = querystring.parse(post);
        console.log(typeof post);
        console.log(post);
        res.write(JSON.stringify(post));
        res.end();
    });
}).listen(3000);
