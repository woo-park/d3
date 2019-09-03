const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log(req.url);

    // if(req.url == '/'){
    //     fs.readFile(
    //         path.join(__dirname, 'public', 'index.html'), 
    //         (err, content)=>{
    //         //we are calling data - content here
    //         if (err) throw err;
    //         res.writeHead(200, {'Content-Type': 'text/html'});     
    //         res.end(content);
    //         }
    //     );
    // }
    // if(req.url == '/about'){
    //     fs.readFile(
    //         path.join(__dirname, 'public', 'about.html'), 
    //         (err, content)=>{
    //         //we are calling data - content here
    //         if (err) throw err;
    //         res.writeHead(200, {'Content-Type': 'text/html'});     
    //         res.end(content);
    //         }
    //     );
    // }
    // if(req.url == '/api/users'){
    //    //normally you would fetch data from database but hardcoding here
    //    const users = [
    //        {name: 'makai mason', age: 24},
    //        {name: 'nick', age:24}
    //    ];
    //    res.writeHead(200, {'Content-Type': 'application/json'});    
    //    res.end(JSON.stringify(users));  
    // }     

    //build file path dynamic
    let filePath = path.join(
        __dirname, 
        'public', 
        req.url === '/' ? 'index.html' : req.url
    );  
    
    //extension of file
    let extname = path.extname(filePath);   //gives the extension of the file being loaded?

    //initial content type
    let contentType = 'text/html';

    //check ext and set content type
    switch (extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    //read file 
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if(err.code == 'ENOENT') {
                //page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                })
            } else {
                // some server error most likely 500
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else{
            //success   
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8');   //finally sending the content to front -
        }
    });
});

const PORT = process.env.PORT || 5000;      //environment variable, gonna look here first whats available and then if not exist - 5000

server.listen(PORT, ()=>{ console.log(`server running on port ${PORT}`)});