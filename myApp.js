require("dotenv").config();
let express = require("express");
let app = express();
const absolutePath = __dirname + "/views/index.html";
const middleWarePath = __dirname + "/public";

// app.METHOD(PATH, HANDLER_FUNCTION)
// Get requests to the home page will get a "Hello Express" message printed to the console //
// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });
app.get('/json', (req, res) => {
  const mySecret = process.env['MESSAGE_STYLE'];
  if (mySecret === "uppercase") {
    res.json({ "message": "Hello json".toUpperCase() })
  } else {
    res.json({ "message": "Hello json" })
  }

});

// Static is a middleware function that takes 3 arguments - request, response, & next function in cycle //
// Static is typically used to execute side effects but can end the cycle with a response if conditioins are met //
app.use("",express.static(req, res, next))

app.use("/public", express.static(middleWarePath));
app.get("/", (req, res) => res.sendFile(absolutePath));

console.log("Hello World");
module.exports = app;
