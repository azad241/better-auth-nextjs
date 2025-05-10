import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_GMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});


export async function sendEmail({to,subject,message}: {to: string;subject: string;message: string;}) {
    
  await transporter.sendMail({
    from: process.env.GOOGLE_APP_GMAIL,
    to,
    subject,
    html: `
    <p>You have requested a password reset</p>
    <p>${message}</p>
    </br>
    <p>If the request was not made by you, please ignore this email</p>
  `,
  });
}