import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user profile (skills, info, password)
export const updateUser = async (req, res) => {
  try {
    const { id, password, ...updateFields } = req.body;
    if (!id) return res.status(400).json({ message: 'User ID is required' });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update all fields except password first
    Object.assign(user, updateFields);

    // If password is provided, assign it directly to trigger pre-save hook
    if (password) {
      user.password = password;
    }

    // Save user (password will be hashed by pre('save') hook if modified)
    const updatedUser = await user.save();

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// Register new user (rely on pre-save for password hashing)
export const registerUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    // Create new user with plain password, it will be hashed in pre('save')
    const newUser = new User({
      email,
      password,
      name,
      role,
      skills: req.body.skills || [],
      seniority: req.body.seniority,
      maxCapacity: req.body.maxCapacity || 100,
      department: req.body.department,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch {
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Login user (returns JWT)
export const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
    console.log(err)
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // comes from auth middleware
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get profile' });
  }
};
