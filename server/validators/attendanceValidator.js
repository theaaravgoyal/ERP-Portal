const validateAttendanceLog = (req, res, next) => {
  const { employeeId, date, status } = req.body;

  if (!employeeId || !date || !status) {
    return res.status(400).json({ success: false, message: 'Please provide employeeId, date, and status.' });
  }

  next();
};

module.exports = { validateAttendanceLog };
