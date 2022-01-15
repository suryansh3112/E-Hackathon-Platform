const router = require("express").Router();
const teamControllers = require("../controllers/team.controller");
const auth = require("../middleware/auth");

//Creates a new Team
router.post("/create", auth, teamControllers.createTeam);

//Join Team
router.post("/join/:teamCode", auth, teamControllers.joinTeam);

//Gets a TeamInfo
router.get("/:teamId", auth, teamControllers.getTeam);

//Updates a TeamInfo
router.put("/:teamId", auth, teamControllers.updateTeam);

//Delete a Team
router.delete("/:teamId", auth, teamControllers.deleteTeam);

module.exports = router;
