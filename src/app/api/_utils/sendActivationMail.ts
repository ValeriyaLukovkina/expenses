import nodemailer from 'nodemailer';

export const sendActivationMail = async (to: string, link: string) => {
    console.log(process.env.SMTP_USER, process.env.SMTP_PASSWORD);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  console.log(process.env.SMTP_USER, process.env.SMTP_PASSWORD);

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Account activation',
    text: '',
    html: `
      <div>
        <h1>Activate your account</h1>
        <a href="${link}">${link}</a>
      </div>
    `,
  })
};
