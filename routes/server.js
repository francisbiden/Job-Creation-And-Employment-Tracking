//import packages
const express = require('express')
const session = require ('express-session')
const mysql = require('mysql2/promise')
require('dotenv').config()

const db = require('../config/db')
const authRoutes = require('../routes/auth') 

//initialize the express app
const app = express()


//set-up middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, '/')))
app.use(express.urlencoded({extended:true}))

//create a connection to the DB server
const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    port:3306,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

//configure session storage
const  MySQLStore = require ('express-mysql-session')(session) ;
const sessionStore = new MySQLStore({},pool);

//Set-up session middleware
app.use(
    session({
        secret:process.env.SESSION_SECRET,
        store:sessionStore,
        resave:false,
        saveUninitialized:false,
        cookie: {
            maxAge:1000 * 60 * 60, // 1 hour
            secure: false, // set this to true if you are using https
        }
    })
)


app.use('/auth'.authRoutes)


//protected routes function
const isAuthenticated = (request,response,next) => {
    if(request.session.user){
        return next();
    } else {
        response.send('You have not logged in.')
    }
}
 

// set-up routes
app.get('/',(request,response) => {
    if(request.session.views){
        request.session.views++;
        response.send(`<p>Current views: ${request.session.views}</p>`)
    }else {
        request.session.views = 1;
        request.session.user = {name: 'Francis',email:'muirurif94@gmail.com',country:'Kenya'}
        response.send('Welcome to basic session management.')

    }
});


app.get('/login',(request,response) => { 
    request.session.user = {name:'Francis', email:'muirurif94@gmail.com', country:'Kenya'}
    response.send('Successfully logged in.')
})


app.get('/profile',isAuthenticated, (request,response) => {
    response.send('Welcome to your profile');
})


app.get('/dashboard', (request,response) => {
    if(request.session.user){
        const user = request.session.user;
        response.send(`<p>User: ${user.name}-${user.email} from ${user.country} </p>`)
    }else {
        response.send('No user info found')
    }
} )


app.get('/destroy',(request,response) => {
    request.session.destroy((err) => {
        if (err){
            console.log('Error destroying session:',err)
        }
    })
})


// POST route to handle form submission
app.post('/submit-login', (req, res) => {
    const { full_name, email, phone_number, experience, location } = req.body;
  
    // Insert form data into MySQL database
    const query = 'INSERT INTO candidates (name, email, phone, experience, location) VALUES (?, ?, ?, ?, ?)';
  
    db.query(query, [full_name, email, phone_number, experience, location], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Database insertion error' });
      }
      res.json({ message: 'Form data inserted successfully', data: result });
    });
  });

//start the server
app.listen(3000, () => {
    console.log(`Server is running on http://127.0.0.1:3000`)
})