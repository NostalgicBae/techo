const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static('public'));

// Routes
app.use('/upload', require('./routes/upload'));
app.use('/complaints', require('./routes/complaints'));

app.listen(PORT, () => { 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});