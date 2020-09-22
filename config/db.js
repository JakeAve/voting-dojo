const mongoose = require('mongoose');
const config = require('config');

const dbURI = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('2: Connected to MongoDB');
  } catch (err) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
