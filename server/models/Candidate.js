const db = require('../config/db');

const Candidate = {
    create: async (data) => {
        const query = `
            INSERT INTO candidates (first_name, last_name, email, phone, resume_url)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [
            data.firstName,
            data.lastName,
            data.email,
            data.phone,
            data.resumeUrl
        ]);
        return result;
    },

    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM candidates');
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM candidates WHERE id = ?', [id]);
        return rows[0];
    },

    update: async (id, data) => {
        const query = `
            UPDATE candidates
            SET first_name = ?, last_name = ?, email = ?, phone = ?, resume_url = ?
            WHERE id = ?
        `;
        const [result] = await db.execute(query, [
            data.firstName,
            data.lastName,
            data.email,
            data.phone,
            data.resumeUrl,
            id
        ]);
        return result;
    },

    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM candidates WHERE id = ?', [id]);
        return result;
    }
};

module.exports = Candidate;
