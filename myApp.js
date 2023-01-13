require("dotenv").config();
let express = require("express");
let app = express();
const absolutePath = __dirname + "/views/index.html";
const middleWarePath = __dirname + "/public";

// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });
app.get('/json', function(req, res) {
  const mySecret = process.env['MESSAGE_STYLE'];
  if (mySecret === "uppercase") {
    res.json({ "message": "Hello json".toUpperCase() })
  } else {
    res.json({ "message": "Hello json" })
  }

});

app.use("/public", express.static(middleWarePath));
app.get("/", (req, res) => res.sendFile(absolutePath));

console.log("Hello World");
module.exports = app;
