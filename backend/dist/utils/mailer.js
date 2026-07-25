"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderStatusUpdateEmail = exports.sendOrderConfirmationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
let transporter;
// Initialize the mailer with Ethereal (mock) for development
// In production, this would use environment variables (process.env.SMTP_HOST, etc.)
nodemailer_1.default.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }
    // Create a reusable transporter object using the default SMTP transport
    transporter = nodemailer_1.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });
    console.log("Mock Email (Ethereal) transporter initialized.");
});
const sendOrderConfirmationEmail = async (user, order) => {
    if (!transporter)
        return;
    const mailOptions = {
        from: '"Xenotrix E-Commerce" <no-reply@xenotrix.com>',
        to: user.email,
        subject: `Order Confirmation - #${order.id.substring(0, 8)}`,
        text: `Hi ${user.name},\n\nThank you for your order!\n\nOrder ID: ${order.id}\nTotal Amount: ₹${order.totalAmount}\nPayment Method: ${order.paymentMethod.replace(/_/g, ' ')}\nStatus: ${order.status}\n\nWe will notify you when your order ships.\n\nBest,\nXenotrix Team`,
        html: `
      <h2>Hi ${user.name},</h2>
      <p>Thank you for your order!</p>
      <ul>
        <li><strong>Order ID:</strong> ${order.id}</li>
        <li><strong>Total Amount:</strong> ₹${order.totalAmount}</li>
        <li><strong>Payment Method:</strong> ${order.paymentMethod.replace(/_/g, ' ')}</li>
        <li><strong>Status:</strong> ${order.status}</li>
      </ul>
      <p>We will notify you when your order ships.</p>
      <p>Best,<br/>Xenotrix Team</p>
    `
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
        // Ethereal specific: Preview URL
        console.log(`Preview URL: ${nodemailer_1.default.getTestMessageUrl(info)}`);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
exports.sendOrderConfirmationEmail = sendOrderConfirmationEmail;
const sendOrderStatusUpdateEmail = async (user, order) => {
    if (!transporter)
        return;
    const mailOptions = {
        from: '"Xenotrix E-Commerce" <no-reply@xenotrix.com>',
        to: user.email,
        subject: `Order Status Update - #${order.id.substring(0, 8)}`,
        text: `Hi ${user.name},\n\nYour order #${order.id.substring(0, 8)} status has been updated to: ${order.status}.\n\nTotal Amount: ₹${order.totalAmount}\n\nBest,\nXenotrix Team`,
        html: `
      <h2>Hi ${user.name},</h2>
      <p>Your order #${order.id.substring(0, 8)} status has been updated to: <strong>${order.status}</strong>.</p>
      <p>Total Amount: ₹${order.totalAmount}</p>
      <p>Best,<br/>Xenotrix Team</p>
    `
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
        // Ethereal specific: Preview URL
        console.log(`Preview URL: ${nodemailer_1.default.getTestMessageUrl(info)}`);
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
exports.sendOrderStatusUpdateEmail = sendOrderStatusUpdateEmail;
