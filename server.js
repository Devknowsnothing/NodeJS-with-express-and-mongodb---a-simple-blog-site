const http = require('http');
const fs = require('fs');
const _ = require('lodash');

http.createServer((req, res) => {
    //lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('Hello');
    });
    greet(); 
    greet();
    //set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301; //status code 301 represents that a page has been permanently moved to a new location
            res.setHeader('Location', '/about');
            res.end();
            break;    
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send an html file
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            //res.write(data);
            res.end(data);
        }

    });

}).listen(3000, 'localhost', () => {
    console.log('Server listening on port 3000');
});