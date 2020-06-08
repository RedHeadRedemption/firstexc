//express connect
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

//mongodb connect
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

//mongoose Schema
var idSchema =new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number
});
var Person = mongoose.model('Person',idSchema);

// --> 7)  Mount the Logger middleware here
/*app.use( (req, res, next)=>{
console.log(req.method+' '+req.path+' - '+req.ip );
next();
});*/

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */


/** 3) Serve an HTML file */
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

/** 4) Serve static assets  */
app.use(express.static(__dirname ));

/** 5) serve JSON on a specific route */


/** 6) Use the .env file to configure the app */
 process.env.MESSAGE_STYLE='uppercase';
let message = {"message": 'Hello json'};
 app.get('/json',(req,res) => {
  if(process.env.MESSAGE_STYLE==='uppercase')
    {
      message.message=message.message.toUpperCase();
    }
   res.json(message);
});
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post("/name",async function(req, res) {
  console.log(mongoose.connection.readyState);

  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  //mongoose code
  try {
    var jonDo = new Person({firstname: req.body.first, lastname: req.body.last, age: 23});
    result = await jonDo.save();
    console.log(result);
    res.json({ name: string });
  }
  catch(err) {
    console.log(err);
    res.redirect("back");
  }



});

app.get("/datab", async function(req, res) {
  console.log(mongoose.connection.readyState);

  //mongoose code
  try {
    result = await Person.find({});
    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err)
    res.redirect("back");
  }
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
 app.listen(process.env.PORT || 3000 );

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
