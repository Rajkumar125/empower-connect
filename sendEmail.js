import nodemailer from "nodemailer";

const createTransporter = () => {
  const mailUser = process.env.MAIL_USER;
  const mailPass = process.env.MAIL_PASS;
  const mailTo = process.env.MAIL_TO;

  if (!mailUser || !mailPass || !mailTo) {
    console.warn(
      "Email config missing. MAIL_USER, MAIL_PASS, and MAIL_TO are required for email notifications."
    );
    return null;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });

  return { transporter, mailUser, mailTo };
};

const sendEmail = async (entry) => {
  const config = createTransporter();

  if (!config) {
    console.log("sendEmail: Email credentials not configured, skipping email");
    return;
  }

  const { transporter, mailUser, mailTo } = config;

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
    console.log("sendEmail: Attempting to send email to", mailTo);
    await transporter.sendMail(mailOptions);
    console.log("sendEmail: Email sent successfully to", mailTo);
  } catch (err) {
    console.error("sendEmail: Failed to send email:", err.message);
    console.error("sendEmail: Full error:", err);
    throw err;
  }
};

export { sendEmail };