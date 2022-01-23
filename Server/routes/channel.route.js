const router = require('express').Router();
const channelControllers = require('../controllers/channel.controller');
const auth = require('../middleware/auth');

//Creates a new Message
router.post('/newMessage', auth, channelControllers.addMessage);

//Gets channels messages
router.get('/:channelId', auth, channelControllers.getChannelMessages);

module.exports = router;
