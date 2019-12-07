const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const port = 8000;
const fetch = require('node-fetch');

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Middleware
// app.use('/', express.static('app'));
app.use('/app', express.static(path.join(__dirname, 'app')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes 
app.get('/', (req, res) => {
    res.render("main", {
        layout: false,
        mem: req.params.main
        });
});

app.get('/countries/:alpha3Code', async function(req, res) {
    let url = 'https://restcountries.eu/rest/v2/alpha/' + req.params.alpha3Code
    let country_data = await fetch(url).then(res => res.json()).then(json => json);
    if (typeof country_data !== 'undefined'){
        let country_name = country_data.name
        let country_region = country_data.region
        res.render('country', {
            country_name: country_name,
            region: country_region,
            layout: false,
        });
    }
    else {
        res.render('main', {
            mem: "Sorry, " + req.params.alpha3Code + " is not a recognized country code.",
            layout: false,
        });
    }
})

app.post('/send', (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMPT transport 
    let transporter = nodemailer.createTransport({
        // host: "mail.google.com",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        service: 'gmail',
        auth: {
          user: '326webproject@gmail.com', // generated ethereal user
          pass: 'forCloud' // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // setup mail with unicode symbols
    let mailOptions = {
        from: 'Your Travel Guide <326webproject@gmail.com>',
        to: 'ben15jman@gmail.com', /*elisesymmes@gmail.com, tiagosaurus@live.com, joemaguire19@gmail.com',*/
        subject: 'New Contact', 
        text: 'Hello World?',
        html: output
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('main', {
            mem: "Thank you for your feedback!",
            layout: false,
        });
    });
});


app.listen(port, () => console.log(`App listening on port ${port}!`));

const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://webprog-user:QmW3PgDnxTidPkq@cluster0-vmxfb.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, {useUnifiedTopology: true}, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const countries = client.db("web-programming-project").collection("countries");
   // perform actions on the collection object

 countries.find({region: "Europe"}).toArray()
   .then((data) => {console.log(data)})
   .catch(err => {});

   client.close();
});