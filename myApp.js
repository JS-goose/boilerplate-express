require("dotenv").config();
let express = require("express");
let app = express();
const absolutePath = __dirname + "/views/index.html";
const middleWarePath = __dirname + "/public";

// Another common way to get input data from a request is by encoding the data after the route path //
// This data is delimited via the ?, includes key/value pairs FIELD=VALUE, and each couple is separated //
// by the ampersand.  Some characters like % have to be encoded first before being sent //
app.get("/name", (req, res) => {
  res.send({ name: `${req.query.first} ${req.query.last}` });
});

// When requesting data from an API, one way to do that is through URL parameters //
// That information can be obtained via the REQUEST.params method where :STRING is //
// used to denote a key:value pair in the request object //
app.get("/:word/:whatever/echo", (req, res) => {
  console.log(req.params);
  console.log(req.params.word);
  res.send({ echo: `${req.params.word}` });
});

// It's possible to chain middleware calls such as the example below
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

// Static is a middleware function that takes 3 arguments - request, response, & next function in cycle //
// Static is typically used to execute side effects but can end the cycle with a response if conditioins are met //
// express.static()
app.use(
  // This works and sends info to the command line
  // "/test",(req,res,next) => {
  //   console.log(req, "REQUEST");
  //   console.log(res, "RESPONSE");
  //   console.log(next, "NEXT");
  // }
  (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  }
);

// Basic routing https://expressjs.com/en/starter/basic-routing.html //
// More details for routing https://expressjs.com/en/guide/routing.html //
// app.METHOD(PATH, HANDLER_FUNCTION)
// Get requests to the home page will get a "Hello Express" message printed to the console //
// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });
app.get("/json", (req, res) => {
  const mySecret = process.env["MESSAGE_STYLE"];
  if (mySecret === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.use("/public", express.static(middleWarePath));
app.get("/", (req, res) => res.sendFile(absolutePath));

console.log("Hello World");
module.exports = app;
