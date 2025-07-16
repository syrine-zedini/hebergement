import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const transporter = nodemailer.createTransport({
   // service: 'gmail', 
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: { 
        user: process.env.SMTP_USER, // SMTP username
        pass: process.env.SMTP_PASS  // SMTP password
    }       

})  ;

export default transporter;