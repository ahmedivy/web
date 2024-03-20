const express = require("express");

app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
