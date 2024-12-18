const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Sunucu ${process.env.PORT || 5000} portunda çalışıyor`);
});
