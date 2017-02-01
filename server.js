/*jshint node:true*/
'use strict';

var fs = require('fs'),
    url = require('url');

var mimeTypes = {
    'css': 'text/css',
    'gif': 'image/gif',
    'js': 'text/javascript',
    'html': 'text/html'
};

exports.run = function (https) {
    var server = https.createServer({
        cert: fs.readFileSync('./cert.pem'),
        key: fs.readFileSync('./key.pem')
    });

    server.on('request', function (req, res) {
        var path = url.parse(req.url).pathname;

        fs.stat('./public' + path, function (err, stat) {
            if (err) {
                if (err.code === 'ENOENT') {
                    if (req.url === '/exit') {
                        res.end();

                        setTimeout(function () {
                            process.exit();
                        }, 100);
                    }

                    res.statusCode = 404;
                    res.end('404 Not Found');
                
                } else {
                    res.statusCode = 500;
                    res.end('500 Internal Server Error');
                }

            } else if (stat.isFile()) {
                res.writeHead(200, {
                    'Content-Type': mimeTypes[path.replace(/^.+\./g, '')]
                });

                fs.createReadStream('./public' + path).pipe(res);
                
            } else {
                res.statusCode = 403;
                res.end('403 Forbidden');
            }
        });
    });

    server.listen(8443, function (err) {
        if (err) {
            console.dir(err);
            setTimeout(function () {
                process.exit(1);
            }, 100);
        }
    });
};
