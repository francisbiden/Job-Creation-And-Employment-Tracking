const mysql = require('mysql2/promise');

// Create a connection to the database
const db = mysql.createPool({
    host: 'localhost', // Your database host
    user: 'root', // Your database username
    password: 'Kabete@200', // Your database password
    database: 'opportunity_portals'// The database you want to connect to
  
});

// Export the pool
module.exports = db;
