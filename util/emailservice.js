const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: "harshilgohil2703@gmail.com",
        pass: "pymx dhpj vqme estk"
    }
})

const sendEmail = async ({ to, subject, html, attachments }) => {
    try {
        const mailOptions = {
            from: "harshilgohil2703@gmail.com",
            to: to,
            subject: subject,
            html: html,
            attachments: attachments,
        };

        const response = await transporter.sendMail(mailOptions)
        if(!response){
            console.log("email will not send")
        }

        console.log("sendMial reports============>",response)
    } catch (error) {
        console.log("sendMial reports============>",error)
        throw new Error('Email could not be sent');
    }
};


module.exports = sendEmail;