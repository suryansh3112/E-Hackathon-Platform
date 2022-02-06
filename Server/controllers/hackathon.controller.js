const models = require('../models');
const Hackathon = models.Hackathon;
const Team = models.Team;
const Channel = models.Channel;

const createHackathon = async (req, res) => {
  try {
    const {
      name,
      tagLine,
      minTeamSize,
      maxTeamSize,
      applicationStartDate,
      applicationEndDate,
      hackathonStartDate,
      hackathonEndDate,
      website_url,
    } = req.body;

    if (
      !name ||
      !minTeamSize ||
      !maxTeamSize ||
      !applicationStartDate ||
      !applicationEndDate ||
      !hackathonStartDate ||
      !hackathonEndDate
    )
      return res
        .status(400)
        .json({ success: false, message: 'Incomplete Data' });

    const newHackathon = await Hackathon.create(req.body);
    const newHackathonChannel = await Channel.create({
      name,
      hackathonId: newHackathon.id,
    });
    await newHackathonChannel.addParticipants(req.user);
    await newHackathonChannel.addAdmins(req.user);
    res.status(200).json({
      success: true,
      message: 'Successfully created hackathon',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllHackathons = async (req, res) => {
  try {
    const hackathonData = await Hackathon.findAll();
    res.status(200).json({
      success: true,
      message: 'Dackathon Data',
      data: hackathonData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createHackathon = createHackathon;
exports.getAllHackathons = getAllHackathons;
