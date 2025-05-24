const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    if (!username || !password) {
        return res.status(404).json({ error: 'Username and password are required'});
    }
    const existingUser = await User.findOne( { username });
    if (existingUser) {
        return res.status(404).json({ error: 'Username already exists' });
    }
     const user = new User({ username, password });
    await user.save();
    const token = generateToken(user);
    res.status(200).json({ result:user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message});
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
        return res.status(404).json({ error: 'Username and password are required'});
    }
    const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(404).json({ error: 'Invalid credentials' });
  }
  const token = generateToken(user);
  res.status(200).json({ result: user, token });

  } catch (error) {
    res.status(500).json({ message: 'Error loggin in, Something went wrong', error: error.message});
  }
};
