const express = require("express");
const cluster = require("cluster");
const os = require("os");

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
} else {
    const app = express();
    const port = 8000;

    app.get("/", (req, res) => {
        return res.json({
            message: `Hello from Express server 🚀 ${process.pid}`,
        });
    });

    app.listen(port, () => console.log(`Server started at port: ${port}`));
}
