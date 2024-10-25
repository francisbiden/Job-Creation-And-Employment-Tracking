const Candidate = require('../models/Candidate');

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
