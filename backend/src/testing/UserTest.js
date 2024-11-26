const mongoose = require('mongoose');
const User = require('./User');
require('dotenv').config();

mongoose.connect('mongodb+srv://williamschristopher1204:lnDaTsWurYnFNFel@fitsync.uziuu.mongodb.net/?retryWrites=true&w=majority&appName=FitSync', { useNewUrlParser: true, useUnifiedTopology: true });


async function testUserSave5() {
  try {
    const user5 = new User({
      username: 'testuser7',
      password: 'POLO123!!', // valid password with special character
    });

    await user5.save();
    console.log('User saved successfully // Pass Test Case 5!');
  } catch (err) {
    console.log('Error saving user: Failed Test Case 5', err.message);
  }
}


testUserSave5();