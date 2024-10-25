const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employerController');

router.post('/register-employer', employerController.registerEmployer);
router.get('/employers', employerController.getEmployers);
router.post('/post-job', employerController.postJob);
router.get('/jobs', employerController.getJobs);

module.exports = router;




