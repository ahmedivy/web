const express = require("express");
const cors = require("cors");

app = express();
app.set("views", __dirname + "/views"); // add __dirname to make it work on vercel
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

console.log(__dirname);

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/cv", function (req, res) {
  res.render("cv");
});

app.get("/landing", function (req, res) {
  res.render("landing");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/crud", function (req, res) {
  res.render("crud");
});

app.use("/api", require("./routes/project"));

app.listen(3000);
