const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

router.post('/register', candidateController.registerCandidate);
router.get('/', candidateController.getCandidates);
router.get('/:id', candidateController.getCandidateById);
router.put('/:id', candidateController.updateCandidate);
router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;

/*

Summary of Endpoints
POST /api/candidates/register: Register a new candidate.
GET /api/candidates: Retrieve all candidates.
GET /api/candidates/:id: Get a specific candidate by ID.
PUT /api/candidates/:id: Update a candidate’s information.
DELETE /api/candidates/:id: Delete a candidate by ID.

*/