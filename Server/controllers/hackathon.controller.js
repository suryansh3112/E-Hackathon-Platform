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
      !hackathonEndDate ||
      !website_url
    )
      return res
        .status(400)
        .json({ success: false, message: 'Incomplete Data' });

    const newHackathon = await Hackathon.create({
      ...req.body,
      organiserId: req.user,
    });
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
      message: 'Hackathon Data',
      data: hackathonData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyOrganizedHackathons = async (req, res) => {
  try {
    const hackathonData = await Hackathon.findAll({
      where: { organiserId: req.user },
    });
    res.status(200).json({
      success: true,
      message: 'Hackathon Data',
      data: hackathonData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyOrganizedHackathonById = async (req, res) => {
  try {
    const hackathonData = await Hackathon.findOne({
      where: { id: req.params.hackathonId },
      include: {
        model: models.Team,
        attributes: ['id', 'name'],
        include: {
          model: models.User,
          as: 'members',
          attributes: ['id'],
        },
      },
    });

    const initialTeams = {
      pending: [],
      accepted: [],
      rejected: [],
    };

    const formattedTeams = hackathonData.teams.reduce((prev, curr) => {
      const obj = {
        id: curr.id,
        name: curr.name,
        members: curr.members.length,
        status: curr.Hackathon_Team.status,
      };
      switch (obj.status) {
        case 0:
          prev.pending.push(obj);
          break;
        case 1:
          prev.accepted.push(obj);
          break;
        case 2:
          prev.rejected.push(obj);
          break;
      }
      return prev;
    }, initialTeams);

    const output = {
      name: hackathonData.name,
      id: hackathonData.id,
      hackathonStartDate: hackathonData.hackathonStartDate,
      hackathonEndDate: hackathonData.hackathonEndDate,
      website_url: hackathonData.website_url,
      teams: formattedTeams,
    };
    res.status(200).json({
      success: true,
      message: 'Hackathon Data',
      data: output,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const applyForHackathon = async (req, res) => {
  try {
    const { teamCode, hackathonId } = req.body;
    const team = await Team.findOne({
      where: { teamCode: teamCode },
    });
    if (!team) {
      return res.status(400).json({
        success: 'false',
        message: 'Invalid Team Code',
      });
    }
    if (team.leaderId !== req.user) {
      return res.status(400).json({
        success: 'false',
        message: 'Only Leader can apply',
      });
    }
    await team.addHackathon(hackathonId);
    res.status(200).json({
      success: true,
      message: 'Applied Successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createHackathon = createHackathon;
exports.getAllHackathons = getAllHackathons;
exports.applyForHackathon = applyForHackathon;
exports.getMyOrganizedHackathons = getMyOrganizedHackathons;
exports.getMyOrganizedHackathonById = getMyOrganizedHackathonById;
