const db = require('../config/db');

const Job = {
    create: async (data) => {
        const query = 'INSERT INTO jobs (employer_id,job_title,job_description,requirements,location,salary) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [data.employerId, data.jobTitle, data.jobDescription, data.requirements,data.location,data.salary]);
        return result;
    },
    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM jobs');
        return rows;
    },
    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM jobs WHERE id = ?', [id]);
        return rows[0];
    },
    // Additional CRUD operations (update, delete, etc.) can go here
};
module.exports = Job;
