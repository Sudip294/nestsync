import Complaint from '../models/Complaint.js';

export const getComplaints = async (req, res) => {
  try {
    let complaints;
    if (req.user.role === 'admin') {
      complaints = await Complaint.find().populate('raisedBy', 'name flatNumber').sort({ createdAt: -1 });
    } else {
      complaints = await Complaint.find({ raisedBy: req.user._id }).populate('raisedBy', 'name flatNumber').sort({ createdAt: -1 });
    }
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const complaint = await Complaint.create({
      title,
      description,
      category,
      raisedBy: req.user._id,
    });
    const populatedComplaint = await complaint.populate('raisedBy', 'name flatNumber');
    
    // We will emit real-time event using socket.io when configured
    const io = req.app.get('socketio');
    if (io) {
      io.emit('newComplaint', populatedComplaint);
    }

    res.status(201).json(populatedComplaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status, adminComments } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    if (status) complaint.status = status;
    if (adminComments) complaint.adminComments = adminComments;

    await complaint.save();
    const populated = await complaint.populate('raisedBy', 'name flatNumber');

    // Notify socket clients about update
    const io = req.app.get('socketio');
    if (io) {
      io.emit('complaintUpdated', populated);
    }

    res.json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
