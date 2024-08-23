const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Function to generate access token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Function to generate refresh token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send('Invalid request data');
    }

    // Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send('User already exists, try to login');
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'Register successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

// Authenticate user and issue tokens
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password required');
    }

    // Find the user and validate the password
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = generateToken(user._id, user.role); // Include role
      const refreshToken = generateRefreshToken(user._id);

      // Save the refresh token to the user's document
      user.refreshToken = refreshToken;
      await user.save();

      res.status(200).json({ accessToken, refreshToken });
    } else {
      res.status(400).send('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

// Refresh the access token using a valid refresh token
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) return res.status(401).json({ message: 'No token provided' });

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    // Check if the refresh token is valid
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Generate a new access token
    const accessToken = generateToken(user._id, user.role);
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Token refresh failed', error });
  }
};

// Logout the user by invalidating the refresh token
const logout = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'User logout failed', error });
  }
};

module.exports = {
  registerUser,
  authUser,
  refreshToken,
  logout,
};
