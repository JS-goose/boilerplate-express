let express = require("express");
let app = express();
const absolutePath = __dirname + '/views/index.html'

// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });

app.get("/", (req,res) => res.sendFile(absolutePath));

console.log("Hello World");
module.exports = app;
