const transporter = require("../config/mailer");
const config = require("../config");

const sendEmail = async (to, subject, htmlContent) => {
  try {
    if (!to) {
      console.warn("⚠️ No recipient email provided. Skipping email.");
      return;
    }

    const info = await transporter.sendMail({
      from: config.email.from,
      to: to,
      subject: subject,
      html: htmlContent,
    });

    console.log(`📧 Email sent: ${info.messageId} to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = { sendEmail };
