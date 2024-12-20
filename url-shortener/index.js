const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser")
const { connectDB } = require("./connection");
const { handleGetRedirectURL } = require("./controllers/url");
const {restrictToLoggedInUserOnly} = require("./middlewares/auth")

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user")

const port = 8080;

const app = express();

connectDB("mongodb://127.0.0.1:27017/node-js-app")
    .then(() => console.log("Mongo DB connected"))
    .catch((err) => console.log(`Error while connecting to MongoDB => ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url",restrictToLoggedInUserOnly,  urlRoute);
app.use("/",staticRoute);
app.use("/user", userRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/:shortId", handleGetRedirectURL);

app.listen(port, () => console.log(`Server started at port: ${port}`));
