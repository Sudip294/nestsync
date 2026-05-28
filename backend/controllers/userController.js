import User from '../models/User.js';
import Settings from '../models/Settings.js';

// Get global settings
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        societyName: 'SmartNest Co-op',
        societyLogo: ''
      });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update global settings (Admin only)
export const updateSettings = async (req, res) => {
  try {
    const { societyName, societyLogo } = req.body;

    // Check size limit (2MB)
    if (societyLogo && societyLogo.length > 2 * 1024 * 1024 * 1.37) { // roughly 2MB in base64
      return res.status(400).json({ message: 'Logo size must be less than 2MB' });
    }

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    if (societyName) settings.societyName = societyName;
    if (societyLogo !== undefined) settings.societyLogo = societyLogo;

    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update personal profile picture
export const updateProfilePicture = async (req, res) => {
  try {
    const { profilePicture } = req.body;

    if (profilePicture && profilePicture.length > 2 * 1024 * 1024 * 1.37) {
      return res.status(400).json({ message: 'Profile picture must be less than 2MB' });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profilePicture = profilePicture;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      flatNumber: user.flatNumber,
      contactNumber: user.contactNumber,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user account
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // Optional: Only allow if not the last admin? (ignoring for now as per prompt)
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Delete associated data
    const Complaint = (await import('../models/Complaint.js')).default;
    const Notice = (await import('../models/Notice.js')).default;
    
    await Complaint.deleteMany({ raisedBy: userId });
    await Notice.deleteMany({ postedBy: userId });

    // Delete user
    await User.findByIdAndDelete(userId);

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Subscribe to push notifications
export const subscribePush = async (req, res) => {
  try {
    const subscription = req.body;
    const user = await User.findById(req.user._id);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if subscription already exists
    const exists = user.pushSubscriptions.some(sub => sub.endpoint === subscription.endpoint);
    if (!exists) {
      user.pushSubscriptions.push(subscription);
      await user.save();
    }

    res.status(201).json({ message: 'Subscription saved.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
