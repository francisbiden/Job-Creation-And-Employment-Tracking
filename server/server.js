const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const db = require('./config/db'); // Your database connection pool

const app = express();

// Create MySQL session store
const sessionStore = new MySQLStore({
    expiration: 86400000, // 1 day
    checkExpirationInterval: 900000, // 15 minutes
}, db);

// Configure express-session to use the MySQL store
app.use(session({
    key: 'jobs website',
    secret: 'ajdb372u7DtyejDry2395m50bfoy694f7r5h5Sg35XgsjQey584hue', // Replace with a strong secret
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

app.use(express.json());

// Example route to set session
app.post('/login', (req, res) => {
    // Assume user is authenticated
    req.session.userId = req.body.userId; // Store user ID in session
    res.send('Logged in');
});

// Example route to get session data
app.get('/profile', (req, res) => {
    if (req.session.userId) {
        res.send(`Welcome, user ${req.session.userId}`);
    } else {
        res.status(401).send('Unauthorized');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
