import Maintenance from '../models/Maintenance.js';

export const getMaintenanceBills = async (req, res) => {
  try {
    let bills;
    if (req.user.role === 'admin') {
      bills = await Maintenance.find().populate('user', 'name flatNumber').sort({ createdAt: -1 });
    } else {
      bills = await Maintenance.find({ user: req.user._id }).populate('user', 'name flatNumber').sort({ createdAt: -1 });
    }
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateBill = async (req, res) => {
  try {
    const { user, month, year, amount, dueDate } = req.body;
    const bill = await Maintenance.create({
      user,
      month,
      year,
      amount,
      dueDate,
    });
    const populated = await bill.populate('user', 'name flatNumber');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const payBill = async (req, res) => {
  try {
    const bill = await Maintenance.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    bill.status = 'paid';
    bill.paidDate = Date.now();
    await bill.save();

    res.json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
