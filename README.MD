🎉 #The Opportunity Portal: Job Creation and Employment Tracking
The Opportunity Portal is a full-stack web application designed to connect job seekers with employers. It allows employers to post job listings, candidates to apply for jobs, and track the status of applications. The project uses a MySQL database and is powered by Node.js on the backend. Below are detailed steps to set up and run this project.

Table of Contents
1.Project Overview
2.Features
3.Technologies Used
4.Project Setup
5.Database Setup
6.Frontend Setup
7.Backend Setup
8.Google Sheets Data Visualization
8.Running the Project
9.Future Improvements
10.Project Overview
The Opportunity Portal is built to streamline the hiring process. Employers can post job openings, while candidates can create profiles and apply for jobs. The portal allows for tracking job statuses, with all interactions recorded in a MySQL database.

#Features
#Employer Management: Add and manage employer profiles.
--Job Listings: Post and view job openings.
--Candidate Profiles: Create profiles and apply for jobs.
--Application Tracking: Monitor the status of job applications.
--Responsive Design: Optimized for mobile and desktop views.
--Forms: Various forms to capture employer and candidate information.
--Data Visualization: The link to Google Sheets for data visualization is provided here.
--Technologies Used
    Frontend: HTML, CSS, SCSS, JavaScript (ES6)
    Backend: Node.js, Express.js
    Database: MySQL
    Other: Google Sheets for Data Visualization
    Project Setup
    Step 1: Clone the Repository
    Clone this repository to your local machine using the following command:

bash
Copy code
git clone https://github.com/yourusername/opportunity-portal.git
Step 2: Install Dependencies
Navigate into the project directory and install the required Node.js dependencies.

bash
Copy code
cd opportunity-portal
npm install
Step 3: Set Up Environment Variables
Create a .env file in the project root and add your database connection details:

bash
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=opportunity_portal
Make sure to replace yourpassword with your actual MySQL password.

#Database Setup
        Step 1: Create the MySQL Database
        Open your MySQL Workbench and create a new database using the following command:


        CREATE DATABASE opportunity_portal;
        Step 2: Create Tables
        You will need to create the following tables:

        employers: Stores employer details.
        jobs: Stores job listings.
        candidates: Stores candidate profiles.
        applications: Tracks job applications.
        job_status: Updates the status of job applications.
        Here's an example of creating the employers table:

        sql
        Copy code
        CREATE TABLE employers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
        Follow this pattern to create the other tables (jobs, candidates, applications, job_status).

Frontend Setup
Step 1: Design the Web Pages
Ensure you have at least 10 fully responsive web pages, including:

Home Page
Login Page (Employer/Candidate)
Employer Registration Form
Candidate Registration Form
Job Listings Page
Employer Dashboard
Candidate Dashboard
Application Status Page
About Us
Contact Us
Each page should follow consistent styling using SCSS for better maintainability.

Step 2: Form Validation
Use JavaScript to validate all forms, ensuring required fields are completed before submission. Include error handling for invalid inputs.

Backend Setup
Step 1: Set Up Express Server
In the app.js file, set up an Express server that handles routing for the frontend forms and interacts with the MySQL database. Here's an example of handling login requests:

js
Copy code
const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Example login route
app.post('/login', (req, res) => {
    const { email, password, user_type } = req.body;

    let query = '';
    if (user_type === 'employer') {
        query = 'SELECT * FROM employers WHERE email = ? AND password = ?';
    } else if (user_type === 'candidate') {
        query = 'SELECT * FROM candidates WHERE email = ? AND password = ?';
    }

    db.query(query, [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
Step 2: Handle Form Submissions
For each form (Employer, Candidate, Job Listings), write routes that accept form data, validate it, and insert it into the corresponding MySQL table.

Google Sheets Data Visualization
You can visualize your database data using Google Sheets for better insights. Export your MySQL data and upload it to Google Sheets.

Paste the link to your Google Sheets visualization here:

Google Sheets Visualization Link
Running the Project
Step 1: Start the MySQL Server
Make sure your MySQL server is running.

Step 2: Start the Node.js Server
Run the following command to start the server:

bash
Copy code
npm start
Navigate to http://localhost:3000 in your browser to access the Opportunity Portal.

#Future Improvements
Implement role-based access control (RBAC) to ensure different permissions for employers and candidates.
Add job search filters by location, experience, and job type.
Build an API to allow third-party integrations.

