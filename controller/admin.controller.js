const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const Admin = require("../model/Admin"); // Sequelize model
const { generateToken } = require("../utils/token");
const { sendEmail } = require("../config/email");
const { secret } = require("../config/secret");
const { tokenForVerify } = require("../config/auth");

// Register Admin
const registerAdmin = async (req, res, next) => {
  try {
    const isAdded = await Admin.findOne({ where: { email: req.body.email } });
    if (isAdded) {
      return res.status(403).json({ message: "This Email already Added!" });
    }

    const newAdmin = await Admin.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });

    const token = generateToken(newAdmin);

    res.status(200).json({
      token,
      _id: newAdmin.id,
      name: newAdmin.name,
      email: newAdmin.email,
    });
  } catch (err) {
    next(err);
  }
};

// Login Admin
const loginAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ where: { email: req.body.email } });

    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      const token = generateToken(admin);
      res.json({
        token,
        _id: admin.id,
        name: admin.name,
        email: admin.email,
      });
    } else {
      res.status(401).json({ message: "Invalid Email or password!" });
    }
  } catch (err) {
    next(err);
  }
};

// Forget Password
const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin Not found with this email!" });
    }

    const token = tokenForVerify(admin);
    const body = {
      from: secret.email_user,
      to: email,
      subject: "Password Reset",
      html: `<h2>Hello ${email}</h2>
        <p>A request has been received to change the password for your <strong>Shofy</strong> account</p>
        <p>This link will expire in <strong>10 minutes</strong>.</p>
        <a href="${secret.admin_url}/forget-password/${token}">Reset Password</a>
        <p>If you did not initiate this request, contact support@shofy.com</p>`,
    };

    await admin.update({
      confirmationToken: token,
      confirmationTokenExpires: dayjs().add(1, "day").toDate(),
    });

    sendEmail(body, res, "Please check your email to reset password!");
  } catch (error) {
    next(error);
  }
};

// Confirm Forget Password
const confirmAdminForgetPass = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const admin = await Admin.findOne({ where: { confirmationToken: token } });

    if (!admin) {
      return res.status(403).json({ message: "Invalid token" });
    }

    if (new Date() > new Date(admin.confirmationTokenExpires)) {
      return res.status(401).json({ message: "Token expired" });
    }

    await admin.update({
      password: bcrypt.hashSync(password),
      confirmationToken: null,
      confirmationTokenExpires: null,
    });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

// Change Password
const changePassword = async (req, res, next) => {
  try {
    const { email, oldPass, newPass } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (!bcrypt.compareSync(oldPass, admin.password)) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    await admin.update({ password: bcrypt.hashSync(newPass) });
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

// Reset Password via token
const resetPassword = async (req, res) => {
  const token = req.body.token;
  const { email } = jwt.decode(token);
  const admin = await Admin.findOne({ where: { email } });

  if (!token || !admin) {
    return res.status(400).json({ message: "Invalid token" });
  }

  jwt.verify(token, secret.jwt_secret_for_verify, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Token expired, please try again!" });
    }

    await admin.update({ password: bcrypt.hashSync(req.body.newPassword) });

    res.json({
      message: "Your password changed successfully, you can login now!",
    });
  });
};

// Add Staff
const addStaff = async (req, res, next) => {
  try {
    const isAdded = await Admin.findOne({ where: { email: req.body.email } });

    if (isAdded) {
      return res.status(400).json({ message: "This Email already Added!" });
    }

    await Admin.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });

    res.status(200).json({ message: "Staff Added Successfully!" });
  } catch (err) {
    next(err);
  }
};

// Get all staff
const getAllStaff = async (req, res, next) => {
  try {
    const admins = await Admin.findAll({ order: [["id", "DESC"]] });
    res.status(200).json({
      status: true,
      message: "Staff get successfully",
      data: admins,
    });
  } catch (err) {
    next(err);
  }
};

// Get staff by ID
const getStaffById = async (req, res, next) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    res.json(admin);
  } catch (err) {
    next(err);
  }
};

// Update staff
const updateStaff = async (req, res, next) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return res.status(404).json({ message: "Staff not found!" });

    await admin.update({
      name: req.body.name,
      email: req.body.email,

      password: req.body.password
        ? bcrypt.hashSync(req.body.password)
        : admin.password,
    });

    const token = generateToken(admin);

    res.json({
      token,
      _id: admin.id,
      name: admin.name,
      email: admin.email,
    });
  } catch (err) {
    next(err);
  }
};

// Delete staff
const deleteStaff = async (req, res, next) => {
  try {
    await Admin.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Admin Deleted Successfully" });
  } catch (err) {
    next(err);
  }
};

// Update status
const updatedStatus = async (req, res) => {
  try {
    const newStatus = req.body.status;

    await Admin.update({ status: newStatus }, { where: { id: req.params.id } });

    res.json({ message: `Status ${newStatus} Successfully!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  forgetPassword,
  resetPassword,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  updatedStatus,
  changePassword,
  confirmAdminForgetPass,
};
