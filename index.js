const express = require("express");
const app = express();
//const env=require('dotenv');
const dotenv = require("dotenv").config();
//env.config();

var fs = require("fs");
var path = require("path");

app.get("/", (req, res, next) => {
  res.send("hello world");
  // next();
});

const dir = path.resolve(path.join(__dirname, "Files"));

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.get("/createfile", (req, res, next) => {
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  var time =
    today.getHours() +
    "hours-" +
    today.getMinutes() +
    "minutes-" +
    today.getSeconds();
  var date = date + " " + time;

  var filename = `${date}.txt`;
  const link = path.resolve(path.join(dir, filename));

  fs.writeFile(link, filename, (err) => {
    console.log(err);
  });
  res.send(`${filename} created successfully`);
});

fs.access("./Files", function (error) {
  if (error) {
    console.log("Directory does not exist.");
  } else {
    console.log("Directory exists.");
  }
});

app.get("/getfile", (req, res) => {
  let files = fs.readdirSync("./Files");
  console.log(files);
  res.send(files);
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
