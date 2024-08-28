const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to save email
app.post('/api/save-email', (req, res) => {
    const { email } = req.body;
    if (email) {
        // Save email to a file
        const filePath = path.join(__dirname, 'emails.txt');
        fs.appendFile(filePath, email + '\n', (err) => {
            if (err) {
                console.error("Error saving email:", err);
                return res.status(500).json({ message: 'Error saving email.' });
            }
            console.log("Saved email:", email);
            res.status(200).json({ message: 'Email saved successfully!' });
        });
    } else {
        res.status(400).json({ message: 'Invalid email.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
