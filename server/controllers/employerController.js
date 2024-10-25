const Employer = require('../models/Employer');

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
