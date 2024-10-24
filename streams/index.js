const express = require("express");
const fs = require("fs");
const status = require("express-status-monitor");
const zip = require('zlib');

const app = express();
const port = 8000;

app.use(status());

fs.createReadStream("./data.txt").pipe(zip.createGzip().pipe(fs.createWriteStream("./data.zip")))

app.get("/", (req, res) => {
    const stream = fs.createReadStream("./data.txt", "utf-8");

    //create a stream
    stream.on("data", (chunk) => {
        res.write(chunk);
    });

    stream.on("end", () => res.end());
});

app.listen(port, () => console.log(`Server running at port: ${port}`));
