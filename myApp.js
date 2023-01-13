let express = require("express");
let app = express();
const absolutePath = __dirname + "/views/index.html";
const middleWarePath = __dirname + "/public";

// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });
app.use("/public", express.static(middleWarePath));
app.get("/", (req, res) => res.sendFile(absolutePath));
app.get("/json", (req, res) => res.json({"message":"Hello json"}));

console.log("Hello World");
module.exports = app;
