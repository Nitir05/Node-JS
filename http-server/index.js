const http = require("node:http"); //different way to import
const fs = require("fs");

const port = 8080;

const myServer = http.createServer((request, response) => {
    const log = `${Date.now()}: New request received on path: ${request.url}\n`;
    fs.appendFile("log.txt", log, () => {
        switch (request.url) {
            case "/":
                response.end("Hello from my NodeJS server");
                break;
            case "/about":
                response.end("Hi i am Nitin");
                break;
            default:
                response.end("404 Not Found");
                break;
        }
    });
});

myServer.listen(port, () => console.log(`Server listening on port ${port}`));
