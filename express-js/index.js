const express = require("express");

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
    res.end("Hello from homepage");
});

app.get("/about", (req, res) => {
    res.end("Hi i am Nitin " + "Hey" + req.query.name);
});

app.listen(port, () => {
    console.log(`Servere started on port ${port}`);
});
