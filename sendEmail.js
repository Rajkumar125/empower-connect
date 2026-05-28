import nodemailer from "nodemailer";

const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;
const mailTo = process.env.MAIL_TO;

if (!mailUser || !mailPass || !mailTo) {
  console.warn(
    "⚠️ Email config missing. MAIL_USER, MAIL_PASS, and MAIL_TO are required for email notifications."
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailUser,
    pass: mailPass,
  },
});

const sendEmail = async (entry) => {
  const mailOptions = {
    from: `"Empower Connect" <${mailUser}>`,
    to: mailTo, // maintainer to receive the mail
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

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("❌ sendEmail failed:", err);
    throw err;
  }
};

export { sendEmail };