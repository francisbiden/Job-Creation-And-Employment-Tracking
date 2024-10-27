const db = require('../config/db');

const postjob = {
    create: async (data) => {
        const query = `
            INSERT INTO jobs (employer_id,job_title,job_description,requirements,location,salary)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [
            data.EmployerId,
            data.jobTitle,
            data.description,
            data.requirements,
            data.location,
            data.salary
        ]);
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

    update: async (id, data) => {
        const query = `
            UPDATE jobs
            SET employer_id = ?, job_title = ?, job_description = ?, requirements = ?, location = ?, salary = ?
            WHERE id = ?
        `;
        const [result] = await db.execute(query, [
            data.EmployerId,
            data.jobTitle,
            data.description,
            data.requirements,
            data.location,
            data.salary,
            id 
            
        ]);
        return result;
    },

    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM jobs WHERE id = ?', [id]);
        return result;
    }
};

module.exports = postjob;
