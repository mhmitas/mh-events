import { createTransport } from "nodemailer"

export async function sendVerificationEmail({ email, verificationToken }) {
    try {
        var transport = createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: "mhmitas.dev@gmail.com",
            to: email,
            subject: "📩 Verify your Email",
            html: await verificationEmailTemplate({ verificationToken, email })
        }

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Email sending error: ", error)
                return false
            }
            console.log(`Email sent: ${info?.response || info}`)
            return true
        })
    } catch (error) {
        console.error("Verification email error: " + error);
    }
}

export async function verificationEmailTemplate({ verificationToken, email }) {
    const html = `<!DOCTYPE html>
        <html lang="en">

            <head>
                <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Simple App</title>
                        <style>
                            * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                            }

                            body {
                            font-family: Arial, sans-serif;
                            text-align: start;
                            margin-top: 100px;
                            padding: 4px;
                            margin-bottom: 15px;
                            }

                            #verify-btn {
                            padding: 10px 20px;
                            font-size: 16px;
                            background-color: #4CAF50;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            text-decoration: none;
                            }

                            #verify-btn:hover {
                                background-color: #45a049;
                            }

                            .title-1 {
                                margin-bottom: 2px;
                            }

                            .p-1 {
                                margin-bottom: 20px;
                            }
                            .btn-container {
                                margin-bottom: 20px;
                            }
                        </style>
                    </head>

                    <body>
                        <h1 class="title-1">MH EVENTS</h1>
                        <p class="p-1">Thank you for registering! Please verify your email address by clicking the button below:</p>
                        <div class="btn-container">
                            <a id="verify-btn" target="_blank" href="${process.env.APP_URL}/verify-email?verificationToken=${verificationToken}&email=${email}">Verify</a>
                        </div>
                        <p>The link will be expire in 30 day</p>
                        <p>Please contact us if you have any problem, email: mhmitas.dev@gmail.com</p>
                    </body>

                </html>`
    return html
}