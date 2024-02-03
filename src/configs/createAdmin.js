const bcrypt = require('bcrypt');
const pool = require('../services/db');

const adminData = {
  username: 'admin',
  email: 'admin@example.com',
  password: 's' // Replace with the actual password
};

const saltRounds = 10;

bcrypt.hash(adminData.password, saltRounds, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    adminData.password = hashedPassword;

    const insertAdminQuery = 'INSERT INTO Admin (username, email, password) VALUES (?, ?, ?)';

    pool.query(insertAdminQuery, [adminData.username, adminData.email, adminData.password], (error, results, fields) => {
      if (error) {
        console.error('Error inserting admin:', error);
      } else {
        console.log('Admin inserted successfully');
      }
      process.exit();
    });
  }
});
