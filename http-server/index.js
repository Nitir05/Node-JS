const http = require("node:http"); //different way to import
const fs = require("fs");
const url = require("url");

const port = 8080;

const serverHandler = (request, response) => {
  if (request.url === "/favicon.ico") {
    response.end();
  }
  const log = `${Date.now()}: ${request.method} New request received on path: ${request.url}\n`;
  const myUrl = url.parse(request.url, true);
  console.log(myUrl);

  fs.appendFile("log.txt", log, () => {
    switch (request.url) {
      case "/":
        response.end("Hello from my NodeJS server");
        break;
      case "/about":
        response.end("Hi i am Nitin");
        break;
      case "/signup":
        if (request.method === "GET") response.end("This is signup form");
        else if (request.method === "POST") {
          //DB call
          response.end("Success");
        }
      default:
        response.end("404 Not Found");
        break;
    }
  });
};

const myServer = http.createServer(serverHandler);

myServer.listen(port, () => console.log(`Server listening on port ${port}`));
