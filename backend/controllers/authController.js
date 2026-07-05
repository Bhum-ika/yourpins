const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password,username } = req.body;

    if(!username || !username.trim()){
      return res.status(400).json({message:"Username is required"});


    }

    const normalizedUsername=username.trim().toLowerCase();

    const usernameRegex=/^[a-z0-9_-]{3,20}$/;
    if(!usernameRegex.test(normalizedUsername)){
      return res.status(400).json({
        message:
        "Username must be 3-20 characters and contain only lowercase letters,numbers,underscores or hyphens",

      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({
        message: "Email already exists",
      });

      const existingUsername=await User.findOne({username:normalizedUsername});
      if(existingUsername) return res.status(400).json({
        message:"Username already taken"
      })
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed ,username:normalizedUsername});

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email ,username:user.username},
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });

    if (!existing)
      return res.status(400).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, existing.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ id: existing._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      token,
      user: { id: existing._id, name: existing.name, email: existing.email ,username:existing.username},
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
