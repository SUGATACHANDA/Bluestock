const bcrypt = require("bcrypt");
const prisma = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.create({
      data: { name, email, password: hashedPassword },
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser, recaptchaValid: true, success: true, });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  const user = await prisma.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid Password" });

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.json({ message: "Login successful", recaptchaValid: true, success: true, token });
};




const createResetEmailTemplate = (name, resetLink) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; padding: 30px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="background-color: #4f46e5; color: #ffffff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">BlueStock IPO</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="margin-top: 0; font-size: 20px; color: #333;">Hi ${name || "there"},</h2>
        <p style="font-size: 16px; color: #555;">
          We received a request to reset your password. Click the button below to set a new one:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 16px;">
            Reset Password
          </a>
        </div>
        <p style="font-size: 14px; color: #888;">
          If you didn't request this, please ignore this email. This link will expire in 5 minutes.
        </p>
        <p style="font-size: 14px; color: #555; margin-top: 20px;">
          Thank you,<br/>The BlueStock IPO Team
        </p>
      </div>
      <div style="background-color: #f3f4f6; text-align: center; padding: 15px; font-size: 12px; color: #888;">
        &copy; ${new Date().getFullYear()} BlueStock IPO. All rights reserved.
      </div>
    </div>
  </div>
`;

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await prisma.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "5m" });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"BlueStock IPO" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: createResetEmailTemplate(user.name, resetLink),
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending reset link" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ message: "Invalid data" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
