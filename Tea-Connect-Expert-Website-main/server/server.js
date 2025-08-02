const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Serve images statically from a local directory
const IMAGES_DIR = 'C:/Users/HP/Pictures/Mysql_images'; // Update this path if needed
app.use('/images', express.static(IMAGES_DIR));

// Convert file path to URL in the response
function convertImagePathToUrl(expert) {
  if (!expert.IMAGE) return expert;
  const fileName = path.basename(expert.IMAGE);
  const fullPath = path.join(IMAGES_DIR, fileName);
  if (fs.existsSync(fullPath)) {
    expert.IMAGE = `http://localhost:${PORT}/images/${fileName}`;
  } else {
    console.log(`Image file not found: ${fullPath}`);
    expert.IMAGE = null;
  }
  return expert;
}

// Get all experts
app.get('/experts', (req, res) => {
  const query = 'SELECT * FROM profile_details';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    // Convert IMAGE field to URL for each expert
    const expertsWithUrls = results.map(expert => convertImagePathToUrl(expert));
    res.json(expertsWithUrls);
  });
});

// Get work experience for a specific expert
app.get('/experts/:id/work-experience', (req, res) => {
  const expertId = req.params.id;
  const query = 'SELECT * FROM work_experience WHERE expert_id = ? ORDER BY start_date DESC';
  db.query(query, [expertId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get available slots for a specific expert
app.get('/api/experts/:id/slots', (req, res) => {
  const expertId = req.params.id;
  const query = `SELECT * FROM time_slot_details WHERE EXPERT_ID = ? AND IS_BOOKED = 0 ORDER BY AVAILABLE_DATE, AVAILABLE_TIME`;
  db.query(query, [expertId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error.' });
    // Always send only the date part for AVAILABLE_DATE
    const fixedResults = results.map(slot => ({
      ...slot,
      AVAILABLE_DATE: slot.AVAILABLE_DATE instanceof Date
        ? slot.AVAILABLE_DATE.toISOString().slice(0, 10)
        : String(slot.AVAILABLE_DATE).slice(0, 10)
    }));
    res.json(fixedResults);
  });
});

// Book a slot
app.post('/api/bookings', (req, res) => {
  const { FULL_NAME, EMAIL, PHONE, MESSAGE, ADDRESS, BOOKED_SLOT, SLOT_ID, STATUS = 'booked' } = req.body;
  if (!FULL_NAME || !EMAIL || !PHONE || !BOOKED_SLOT || !SLOT_ID) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  // Check if slot is still available
  db.query('SELECT IS_BOOKED FROM time_slot_details WHERE SLOT_ID = ?', [SLOT_ID], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error.' });
    if (!results.length || results[0].IS_BOOKED) {
      return res.status(400).json({ error: 'Slot already booked.' });
    }
    // Insert booking
    const insertBooking = `INSERT INTO booking_details (FULL_NAME, EMAIL, PHONE, MESSAGE, ADDRESS, BOOKED_SLOT, SLOT_ID, STATUS) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [FULL_NAME, EMAIL, PHONE, MESSAGE, ADDRESS, BOOKED_SLOT, SLOT_ID, STATUS];
    db.query(insertBooking, values, (err2, result) => {
      if (err2) return res.status(500).json({ error: 'Database error.' });
      // Mark slot as booked
      db.query('UPDATE time_slot_details SET IS_BOOKED = 1 WHERE SLOT_ID = ?', [SLOT_ID], (err3) => {
        if (err3) console.error('Error updating slot:', err3);
        res.status(201).json({ message: 'Booking created successfully!', bookingId: result.insertId });
      });
    });
  });
});

// Add review endpoint for experts
app.post('/api/experts/:id/reviews', (req, res) => {
  const expertId = req.params.id;
  const { FULL_NAME, PHONE, EMAIL, MESSAGE } = req.body;
  if (!FULL_NAME || !PHONE || !EMAIL || !MESSAGE) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  const query = `INSERT INTO review_details (FULL_NAME, PHONE, EMAIL, MESSAGE, EXPERT_ID)
                 VALUES (?, ?, ?, ?, ?)`;
  const values = [FULL_NAME, PHONE, EMAIL, MESSAGE, expertId];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting review:', err);
      return res.status(500).json({ error: 'Database error.' });
    }
    res.status(201).json({ message: 'Review submitted successfully!' });
  });
});

// Get all reviews for a particular expert
app.get('/api/experts/:id/reviews', (req, res) => {
  const expertId = req.params.id;
  const query = `SELECT FULL_NAME, MESSAGE, EMAIL, PHONE, USER_ID FROM review_details WHERE EXPERT_ID = ? ORDER BY USER_ID DESC`;
  db.query(query, [expertId], (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      return res.status(500).json({ error: 'Database error.' });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});