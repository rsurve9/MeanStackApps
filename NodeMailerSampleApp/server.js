var express = require('express'); // Import the express module for server functions
var app = express(); // Use functions and commands withing the express module.
var bodyParser = require('body-parser'); // Used by the server to parse the request.
var nodemailer = require("nodemailer"); // Email utility.

app.use(express.static(__dirname + "/public")); // Tells application that all static files (html, javascript and so) are located in this folder.
app.use(bodyParser.json()); 

// Send email
app.post('/sendEmail',function(req, res){
    
    var emailId = req.body.emailId;
    console.log("From server",emailId);

    var emailSubject = req.body.emailSubject;
    console.log("From server",emailSubject); 

    var emailBody = req.body.emailBody;
    console.log("From server",emailBody);

    // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use SSL
    auth: {
        user: 'abc@gmail.com',
        pass: 'password'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Test Email" <abc@gmail.com>', // sender address
    to:  emailId, // list of receivers
    subject: emailSubject, // Subject line
    // text: 'Hello world ?', // plain text body
    html: emailBody // html body
};

// Turn ON this email setting to send emails for gmail:  https://www.google.com/settings/security/lesssecureapps

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    else{
        console.log('Message %s sent: %s', info.messageId, info.response);             
        smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    }      
    });
});

app.listen(3000);
console.log("Server running on port 3000");