const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { sendEmail } = require("../config/email");
const { generateToken, tokenForVerify } = require("../utils/token");
const { secret } = require("../config/secret");

// signup
exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.send({ status: "failed", message: "Email already exists" });
    }

    const saved_user = await User.create(req.body);
    const token = saved_user.generateConfirmationToken();

    await saved_user.save(); // token updated

    return res.status(200).json({
      status: "success",
      message: "User created successfully",
      data: { user: saved_user, token },
    });

    // const mailData = {
    //   from: secret.email_user,
    //   to: req.body.email,
    //   subject: "Verify Your Email",
    //   html: `<h2>Hello ${req.body.name}</h2>
    //     <p>Verify your email address to complete the signup and login into your <strong>shofy</strong> account.</p>
    //     <p>This link will expire in <strong> 10 minutes</strong>.</p>
    //     <a href="${secret.client_url}/email-verify/${token}" style="background:#0989FF;color:white;padding:10px 15px;border-radius:4px;text-decoration:none;">Verify Account</a>
    //     <p>If you did not initiate this request, please contact us immediately.</p>
    //     <strong>Shofy Team</strong>`
    // };

    // sendEmail(mailData, res, "Please check your email to verify!");
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ status: "fail", error: "Missing credentials" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ status: "fail", error: "No user found" });
    }

    const isPasswordValid = await user.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ status: "fail", error: "Wrong password" });
    }

    // if (user.status !== "active") {
    //   return res
    //     .status(401)
    //     .json({ status: "fail", error: "Account not active yet" });
    // }

    const token = generateToken(user);
    const { password: _, ...others } = user.get({ plain: true });

    res.status(200).json({
      status: "success",
      message: "Logged in",
      data: { user: others, token },
    });
  } catch (error) {
    next(error);
  }
};

exports.confirmEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ where: { confirmationToken: token } });

    if (!user)
      return res.status(403).json({ status: "fail", error: "Invalid token" });

    const expired = new Date() > user.confirmationTokenExpires;
    if (expired)
      return res.status(401).json({ status: "fail", error: "Token expired" });

    user.status = "active";
    user.confirmationToken = null;
    user.confirmationTokenExpires = null;

    await user.save();

    const accessToken = generateToken(user);
    const { password: _, ...others } = user.get({ plain: true });

    res.status(200).json({
      status: "success",
      message: "Account activated",
      data: { user: others, token: accessToken },
    });
  } catch (error) {
    next(error);
  }
};

exports.forgetPassword = async (req, res, next) => {
  try {
    const { verifyEmail } = req.body;
    const user = await User.findOne({ where: { email: verifyEmail } });

    if (!user)
      return res
        .status(404)
        .send({ message: "User not found with this email!" });

    const token = tokenForVerify(user);
    user.confirmationToken = token;
    user.confirmationTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await user.save();

    const mailData = {
      from: secret.email_user,
      to: verifyEmail,
      subject: "Password Reset",
      html: `<h2>Hello ${verifyEmail}</h2>
        <p>Reset your <strong>Shofy</strong> password.</p>
        <p>This link will expire in <strong>10 minutes</strong>.</p>
        <a href="${secret.client_url}/forget-password/${token}" style="background:#0989FF;color:white;padding:10px 15px;border-radius:4px;text-decoration:none;">Reset Password</a>`,
    };

    sendEmail(mailData, res, "Check your email to reset password!");
  } catch (error) {
    next(error);
  }
};

exports.confirmForgetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({ where: { confirmationToken: token } });

    if (!user)
      return res.status(403).json({ status: "fail", error: "Invalid token" });

    const expired = new Date() > user.confirmationTokenExpires;
    if (expired)
      return res.status(401).json({ status: "fail", error: "Token expired" });

    const newPassword = bcrypt.hashSync(password);
    await User.update(
      {
        password: newPassword,
        confirmationToken: null,
        confirmationTokenExpires: null,
      },
      { where: { id: user.id } }
    );

    res
      .status(200)
      .json({ status: "success", message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { email, password, googleSignIn, newPassword } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = bcrypt.hashSync(newPassword);

    if (googleSignIn) {
      await user.update({ password: hashedPassword });
      return res.status(200).json({ message: "Password changed successfully" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect current password" });

    await user.update({ password: hashedPassword });
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.set(req.body);
    const updatedUser = await user.save();

    const token = generateToken(updatedUser);
    res.status(200).json({
      status: "success",
      message: "Profile updated",
      data: { user: updatedUser, token },
    });
  } catch (error) {
    next(error);
  }
};

exports.signUpWithProvider = async (req, res, next) => {
  try {
    const decoded = jwt.decode(req.params.token);
    const user = await User.findOne({ where: { email: decoded.email } });

    if (user) {
      const token = generateToken(user);
      return res.status(200).send({
        status: "success",
        data: {
          token,
          user: {
            ...user.get({ plain: true }),
            googleSignIn: true,
          },
        },
      });
    }

    const newUser = await User.create({
      name: decoded.name,
      email: decoded.email,
      imageURL: decoded.picture,
      status: "active",
    });

    const token = generateToken(newUser);
    res.status(200).send({
      status: "success",
      data: {
        token,
        user: {
          ...newUser.get({ plain: true }),
          googleSignIn: true,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
