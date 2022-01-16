const Complaint = require('../models/Complaint');

// @desc Get all stores
// @route GET /api/v1/stores
// @access Public
exports.getComplaints = async (req, res, next) => {
    try {
        const complaints = await Complaint.find();

        return res.status(200).json({
            success: true,
            count: complaints.length,
            data: complaints
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};