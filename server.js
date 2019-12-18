const express = require('express');
const expressValidator = require('express-validator');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(expressValidator());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in Production (Serve React)
if (process.env.NODE_ENV === 'production') {
  // Set static folder (The static assets that React builds for us)
  app.use(express.static('client/build'));

  // This route is for anything that does not include the above api routes. That's why we put this below those routes.
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
