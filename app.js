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
    res.render("test", {
        layout: false,
        mem: req.params.test
        });
});

app.get('/countries/:alpha3Code', async function(req, res) {
    let url = 'https://restcountries.eu/rest/v2/alpha/' + req.params.alpha3Code
    let country_name = await fetch(url).then(res => res.json()).then(json => json.name);
    if (typeof country_name !== 'undefined'){
        res.render('country', {
            country_name: country_name,
            layout: false,
        });
    }
    else {
        res.render('test', {
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
        from: 'web-prog-proj <326webproject@gmail.com>',
        to: 'ben15jman@gmail.com, elisesymmes@gmail.com, tiagosaurus@live.com, joemaguire19@gmail.com',
        subject: 'Test', 
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
        res.render('test', {
            mem: "Thanke you for your feedback!",
            layout: false,
        });
    });
});


app.listen(port, () => console.log(`App listening on port ${port}!`));