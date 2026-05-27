import Notice from '../models/Notice.js';
import User from '../models/User.js';
import webpush from 'web-push';

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().populate('postedBy', 'name').sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotice = async (req, res) => {
  try {
    const { title, content } = req.body;
    const notice = await Notice.create({
      title,
      content,
      postedBy: req.user._id,
    });
    const populatedNotice = await notice.populate('postedBy', 'name');

    // Send push notification to all users
    try {
      const users = await User.find({ 'pushSubscriptions.0': { $exists: true } });
      const payload = JSON.stringify({
        title: 'New Notice Posted',
        body: title,
        url: '/notices'
      });
      
      users.forEach(u => {
        u.pushSubscriptions.forEach(sub => {
          webpush.sendNotification(sub, payload).catch(err => console.error('Push error:', err));
        });
      });
    } catch (e) {
      console.error('Error sending push notifications', e);
    }

    res.status(201).json(populatedNotice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: 'Notice not found' });

    await notice.deleteOne();
    res.json({ message: 'Notice removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
