let express = require("express");
let bodyParser = require("body-parser");
let mustacheExpress = require('mustache-express');
let Student = require("./models/student");

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Register '.mustache' extension with Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', 'views');

// Error message variable to be used to pass along 
// information to subsequent route if an error happens.
let error = '';

app.post("/create", (req, res) => {

    if (isNaN(parseFloat(req.body.gpa))) {
      error = 'GPA was not a floating point value.';
      res.redirect('/');
      return;
    }

    // Create a student from the submitted form data
    let stu = new Student({
        name: req.body.name,
        gpa: req.body.gpa,
        birthDate: new Date(req.body.birthdate)
    });

    stu.save((err, stu) => {
        if (err) {
            res.status(400).send(err);
        } else {            
            res.redirect('/');
        }
    });
});

app.get("/", (req, res) => {
  Student.find((err, students) => {
    let view = { students , errormsg : error};
    res.render('student', view);
    error = '';
  });
});

app.post("/search", (req, res) => {
  let name = req.body.name;  

  Student.find({ name : name }, (err, students) => {
    let view = { students , errormsg : error};
    res.render('student', view);
    error = '';
  });
});

app.get('/remove', (req, res) => {
  Student.remove({}, (err) => {
    if (err) {
      error = err.errormsg;      
    }
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server Running.');
  console.log('Visit http://localhost:3000 in your favorite browser.');
});