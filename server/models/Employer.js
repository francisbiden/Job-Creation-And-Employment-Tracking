const db = require('../config/db');

const Employer = {
    create: async (data) => {
        const query = 'INSERT INTO employers (company_name, location, industry, contact_email) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [data.companyName, data.location, data.industry, data.contactEmail]);
        return result;
    },
    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM employers');
        return rows;
    },
    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM employers WHERE id = ?', [id]);
        return rows[0];
    },
    // Additional CRUD operations (update, delete, etc.) can go here
};

module.exports = Employer;
