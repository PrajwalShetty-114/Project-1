import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import nodemailer from 'nodemailer';

// import SendmailTransport from 'nodemailer/lib/sendmail-transport';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

app.post('/submit',(req,res)=>{
//NODEMAIL CONFIGURATION
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: process.env.EMAIL_USER ,
       pass: process.env.EMAIL_PASS
    }});
const userEmail=req.body.email;
const mailOptions = {
    from: userEmail,
    to: 'prajwalshetty969@gmail.com',
    subject: 'Contact Form Submission from ' + req.body.name,
    text: `Name: ${req.body.name}\nEmail: ${userEmail}\nMessage: ${req.body.message}`  
 }
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
//TILL HERE
});


app.get('/purpose', (req, res) => {
    res.render('purpose.ejs');
});

app.use((req, res) => {
    res.status(404).render('404.ejs');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});