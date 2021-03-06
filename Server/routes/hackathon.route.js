const router = require('express').Router();
const hackathonControllers = require('../controllers/hackathon.controller');
const auth = require('../middleware/auth');

//Creates a new Hackathon
router.post('/create', auth, hackathonControllers.createHackathon);

//Gets all Hackathon
router.get('/', auth, hackathonControllers.getAllHackathons);

//Gets my Organised Hackathon
router.get(
  '/my-organised-hackathon',
  auth,
  hackathonControllers.getMyOrganizedHackathons
);

//Gets a HackathonInfo
router.get(
  '/:hackathonId',
  auth,
  hackathonControllers.getMyOrganizedHackathonById
);

//Accept Team
router.post('/acceptTeam', auth, hackathonControllers.acceptTeam);

//Reject Team
router.post('/rejectTeam', auth, hackathonControllers.rejectTeam);

//Apply for a new Hackathon
router.post('/apply', auth, hackathonControllers.applyForHackathon);

// //Join Team
// router.post("/join/:teamCode", auth, teamControllers.joinTeam);

// //Gets a TeamInfo
// router.get("/:teamId", auth, teamControllers.getTeam);

// //Updates a TeamInfo
// router.put("/:teamId", auth, teamControllers.updateTeam);

// //Delete a Team
// router.delete("/:teamId", auth, teamControllers.deleteTeam);

module.exports = router;
