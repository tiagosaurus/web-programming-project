const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const port = 8000;


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
        });
});

app.post('/send', (req, res) => {
    // console.log(req.body);
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
        to: 'ben15jman@gmail.com',
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

        // res.render('test', {msg: 'Email has been sent'},{
        //             layout: false,
        // )};
        res.render("test", /*{msg: 'Email sent'},*/ {
            layout: false,
            });
    });
});


app.listen(port, () => console.log(`App listening on port ${port}!`));