const nodemailer = require('nodemailer')
require('dotenv').config()

const sendEmail = async (item, priceInfo, status) => {
    try {
        const transporter = await nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        await transporter.sendMail({
            from: 'AmazonPriceMonitor@developer.com',
            to: `${item.email}`,
            subject: `Amazon Price Monitor - ${item.name.substring(0, 30)}...`,
            text: `Amazon Price Monitor - ${item.name}`,
            html: `<body><h3>Amazon Price Monitor</h3> <p>${status} ${item.name}</p><h4>Target price: $${item.targetPrice}</h4><h4>Current Item price: $${item.price}</h4><h4>${priceInfo}</h4><p>Here is the link for the item: ${item.link}</p><p>*****Please do not reply to this email. This email is only used to provide automatic information.*****</p></body>`
        })
        console.log('Email sent successfully')
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = sendEmail