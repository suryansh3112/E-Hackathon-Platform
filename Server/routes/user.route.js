const router = require('express').Router();
const userControllers = require('../controllers/user.controller');
const auth = require('../middleware/auth');

//registers a new User
router.post('/register', userControllers.register);

//Handle Login
router.post('/login', userControllers.login);

router.post('/tokenIsValid', userControllers.tokenIsValid);

//Gets user channels
router.get('/channels', auth, userControllers.getUserChannel);

//Gets user channels
router.get('/teams', auth, userControllers.getUserTeams);

//Gets Profile
router.get('/profile/:userName', auth, userControllers.getProfile);

//Gets Registered Hackathons
router.get('/myHackathons', auth, userControllers.getRegisteredHackathons);

//Updates Profile
router.patch('/profile', auth, userControllers.updateProfile);

module.exports = router;
