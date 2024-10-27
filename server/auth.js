const express = require('express');
const router = express.Router();
const authController = require('./authController');


router.post('/register-employer', authController.registerEmployer);
router.get('/employers', authController.getEmployers);
router.post('/post-job', authController.postJob);
router.get('/jobs', authController.getJobs);

router.post('/register-candidate', authController.registerCandidate);
router.get('/', authController.getCandidates);
router.get('/:id', authController.getCandidateById);
router.put('/:id', authController.updateCandidate);
router.delete('/:id', authController.deleteCandidate);

module.exports = router;

/*

Summary of Endpoints
POST /api/candidates/register: Register a new candidate.
GET /api/candidates: Retrieve all candidates.
GET /api/candidates/:id: Get a specific candidate by ID.
PUT /api/candidates/:id: Update a candidate’s information.
DELETE /api/candidates/:id: Delete a candidate by ID.

*/


