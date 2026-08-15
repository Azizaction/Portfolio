import {nodemailer} from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gamil', 

    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

export default transporter