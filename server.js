const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const userRoutes = require('./src/routes/userRoutes');
const connectToDb = require('./src/config/db');
require('dotenv').config()

const port = process.env.PORT || 9090;
const db_url = process.env.MONGO_URI;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is the home route');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.listen(port, async () => {
  try {
    await connectToDb(db_url);
    console.log('Connected to Database');
    console.log(`Server is running at port: ${port}`);
  } catch (err) {
    console.error('Failed to connect to Database:', err.message);
  }
});
