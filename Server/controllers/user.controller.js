const models = require('../models');
const User = models.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//------------------------------------------------------REGISTER------------------------------------------------------
const register = async (req, res) => {
  try {
    let { userName, email, password, confirmPassword } = req.body;

    //===========================Validation===========================

    if (!userName || !email || !password || !confirmPassword)
      return res
        .status(400)
        .json({ message: 'Not all fields have been entered.' });

    const existingEmail = await User.findOne({ where: { email: email } });
    if (existingEmail)
      return res
        .status(400)
        .json({ message: 'An account with this email already exists.' });

    const existingUserName = await User.findOne({
      where: { userName: userName }
    });
    if (existingUserName)
      return res
        .status(400)
        .json({ message: 'This userName is already registered.' });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: 'The password needs to be atleast 6 characters.' });
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: 'Please enter the same password twice' });

    //========================SAVING-USER=======================================

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const savedUser = await User.create({
      userName,
      email,
      password: passwordHash
    });
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//----------------------------------------------------------LOGIN-----------------------------------------------------
const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password)
      return res
        .status(400)
        .json({ message: 'Not all fields have been entered.' });

    //Checking for registered email or username and assigning it to "user"
    let user;
    const usernameCheck = await User.findOne({
      where: { userName: emailOrUsername }
    });

    if (usernameCheck) {
      user = usernameCheck;
    } else {
      const emailCheck = await User.findOne({
        where: { email: emailOrUsername }
      });
      if (emailCheck) {
        user = emailCheck;
      } else {
        return res.status(400).json({
          message: 'No account with this email or username is registered.'
        });
      }
    }

    //Checking password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid Credentials' });

    //Assigning Json Web Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    // , {expiresIn: '3h'}
    res.status(200).json({
      token,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// //-----------------------------------------------TOKEN-IS-VALID---------------------------------------------------------
const tokenIsValid = async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json({ status: false });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json({ status: false });
    }
    const user = await User.findByPk(verified.id);
    return res.json({
      status: true,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//------------------------------------------------EXPORTS-----------------------------------------------------------
exports.register = register;
exports.login = login;
exports.tokenIsValid = tokenIsValid;
