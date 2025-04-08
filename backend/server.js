const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const grandparentRoutes = require("./routes/grandparentRoutes");
const medicalProfessionalRoutes = require("./routes/medicalProfessionalRoute");

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Or restrict to your Expo IP like 'http://192.168.0.100:19000'
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('Grandparents Gateway API running...');
});

app.use("/", grandparentRoutes);
app.use("/", medicalProfessionalRoutes);






// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(3000,"0.0.0.0", () => {
      console.log(`🚀 Server running on 3000`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
