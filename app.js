// app.js
const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant');

const app = express();
const PORT = 3000;

// Connection URI.
const mongoURI = 'mongodb+srv://evaw0929:Ilovecats1314@cluster0.pt8pr8x.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse JSON
app.use(express.json());

// REST API to return all restaurant details
app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// REST API to return all restaurant details by cuisine
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  const { cuisine } = req.params;
  try {
    const restaurants = await Restaurant.find({ cuisine });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// REST API to return selected columns and sorting by restaurant_id
app.get('/restaurants', async (req, res) => {
  const { sortBy } = req.query;
  try {
    const restaurants = await Restaurant.find()
      .select('restaurant_id cuisine name city')
      .sort({ restaurant_id: sortBy === 'ASC' ? 1 : -1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// REST API to return specific restaurants details
app.get('/restaurants/:cuisine', async (req, res) => {
  const { cuisine } = req.params;
  try {
    const restaurants = await Restaurant.find({ cuisine, city: { $ne: 'Brooklyn' } })
      .select('cuisine name city')
      .sort({ name: 1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
