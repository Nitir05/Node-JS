const express = require("express");
const path = require("path");
const multer = require("multer");

const port = 8000;

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, filename, cb) => {
    return cb(null, `${Date.now()}-${filename.originalname}`)
  }
});

const upload = multer({storage: storage})

app.use(express.urlencoded({extended: false}))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("homepage")
});

app.post("/upload",upload.single("profileImage"), (req, res) => {
  return res.redirect("/")
})

app.listen(port, () => console.log(`Server started at port: ${port}`));

