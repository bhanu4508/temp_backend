const express = require('express');
const app = express();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

require('dotenv').config();

const PORT = process.env.PORT || 5000; // Port number for the server

const connectDB = require("./config/dbConfig");

// Middleware
app.use(express.json());

connectDB();

require('dotenv').config();

// Error Handling middlewares
// app.use(notFound);
// app.use(errorHandler);

// // Routes
const noteRoutes = require('./routes/noteRoute');
const userRoutes = require('./routes/userRoute');

app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
