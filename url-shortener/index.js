const express = require("express");
const urlRouter = require("./routes/url");
const { connectDB } = require("./connection");
const { handleGetRedirectURL } = require("./controllers/url");

const port = 8080;

const app = express();

connectDB("mongodb://127.0.0.1:27017/node-js-app")
    .then(() => console.log("Mongo DB connected"))
    .catch((err) => console.log(`Error while connecting to MongoDB => ${err}`));

app.use(express.json());
app.use(express.urlencoded());
app.use("/url", urlRouter);

app.get("/:shortId", handleGetRedirectURL);

app.listen(port, () => console.log(`Server started at port: ${port}`));