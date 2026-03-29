import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async (entry) => {
  const mailOptions = {
    from: `"Empower Connect" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO, // maintainer to receive the mail
    subject: "New Registration",
    html: `
      <h3>New Registration</h3>
      <p><b>Name:</b> ${entry.Name}</p>
      <p><b>Email:</b> ${entry.Email}</p>
      <p><b>Phone:</b> ${entry.Phone}</p>
      <p><b>Message:</b> ${entry.Message}</p>
      <p><b>Time:</b> ${entry.Timestamp}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export { sendEmail };