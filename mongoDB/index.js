const express = require("express");

const connectMongoDb = require("./connection");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

const port = process.env.PORT || 3000;

const app = express();

//Connection
connectMongoDb("mongodb://127.0.0.1:27017/node-js-app")
    .then(() => console.log("Mongo DB connected"))
    .catch((err) => console.log("Error connecting Mongo DB", err));

//Middleware(Plugin)
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(port, () => console.log(`Server started at port: ${port}`));
