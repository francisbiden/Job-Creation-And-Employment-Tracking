const bcrypt = require('bcrypt');
const db = require('./config/db');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        req.session.userId = user[0].id;
        req.session.role = user[0].role; // Optional: Use for role-based access
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

//candidate
const Candidate = require('./models/Candidate');

exports.registerCandidate = async (req, res) => {
    try {
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            resumeUrl: req.body.resumeUrl || null
        };
        const result = await Candidate.create(data);
        res.status(201).json({ message: 'Candidate registered successfully', candidateId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering candidate' });
    }
};

exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.findAll();
        res.status(200).json(candidates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving candidates' });
    }
};

exports.getCandidateById = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving candidate' });
    }
};

exports.updateCandidate = async (req, res) => {
    try {
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            resumeUrl: req.body.resumeUrl || null
        };
        const result = await Candidate.update(req.params.id, data);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json({ message: 'Candidate updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating candidate' });
    }
};

exports.deleteCandidate = async (req, res) => {
    try {
        const result = await Candidate.delete(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting candidate' });
    }
};



//employer
const Employer = require('./models/Employer');

exports.registerEmployer = async (req, res) => {
    try {
        const data = {
            companyName: req.body.companyName,
            location: req.body.location,
            industry: req.body.industry,
            contactEmail: req.body.contactEmail
        };
        const result = await Employer.create(data);
        res.status(201).json({ message: 'Employer registered successfully', employerId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering employer' });
    }
};

exports.getEmployers = async (req, res) => {
    try {
        const employers = await Employer.findAll();
        res.status(200).json(employers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving employers' });
    }
};


//postjob
const Job= require('./models/postjob');

exports.postJob = async (req, res) => {
    try {
        const data = {
            employerId: req.body.employerId,
            jobTitle: req.body.jobTitle || null,
            description: req.body.description || null,
            requirements: req.body.requirements,
            location: req.body.location,
            salary: req.body.salary || null
        };
        const result = await Job.create(data);
        res.status(201).json({ message: 'Job Posted successfully', jobId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error posting Job' });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll();
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving jobs' });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving job' });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const data = {
            employerId: req.body.employerId,
            jobTitle: req.body.jobTitle || null,
            description: req.body.description || null,
            requirements: req.body.requirements,
            location: req.body.location,
            salary: req.body.salary || null
        };
        const result = await Job.update(req.params.id, data);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating job' });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const result = await Job.delete(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting job' });
    }
};
