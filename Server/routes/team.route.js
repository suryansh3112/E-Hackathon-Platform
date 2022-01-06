const router = require('express').Router();
const teamControllers = require('../controllers/team.controller');
const auth = require('../middleware/auth');

//Creates a new Team
router.post('/create', auth, teamControllers.createTeam);

//Gets a TeamInfo
router.get('/:teamName', auth, teamControllers.getTeam);

//Updates a TeamInfo
router.put('/:teamName', auth, teamControllers.updateTeam);

//Delete a Team
router.delete('/:teamName', auth, teamControllers.deleteTeam);

module.exports = router;
