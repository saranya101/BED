// Importing bcrypt for password hashing
const bcrypt = require('bcrypt');

// Importing the database connection pool
const pool = require('../services/db');

// Object containing admin data to be inserted into the database
const adminData = {
  username: 'admin',
  email: 'admin@example.com',
  password: 's' // Replace with the actual password
};

// Number of salt rounds for password hashing
const saltRounds = 10;

// Hashing the admin password using bcrypt
bcrypt.hash(adminData.password, saltRounds, (err, hashedPassword) => {
  if (err) {
    // If there's an error during password hashing, log the error
    console.error('Error hashing password:', err);
  } else {
    // If password hashing is successful, update the adminData object with the hashed password
    adminData.password = hashedPassword;

    // SQL query to insert the admin data into the database
    const insertAdminQuery = 'INSERT INTO Admin (username, email, password) VALUES (?, ?, ?)';

    // Executing the SQL query using the database connection pool
    pool.query(insertAdminQuery, [adminData.username, adminData.email, adminData.password], (error, results, fields) => {
      if (error) {
        // If there's an error during the database operation, log the error
        console.error('Error inserting admin:', error);
      } else {
        // If the admin is inserted successfully, log a success message
        console.log('Admin inserted successfully');
      }
      // Exiting the process
      process.exit();
    });
  }
});
