const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

/**
 * Promises version
 */
/*

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(error => {
      console.error(error.message);
      process.exit(1);
    });
};


*/
/***
 * Async Await Version - CLEANER.
 */

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
