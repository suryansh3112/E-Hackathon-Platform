const models = require('../models');
const User = models.User;
const Team = models.Team;
const Channel = models.Channel;

const profileNotCompleted = async (userId) => {
  const user = await User.findByPk(userId);
  return !user.profileCompleted;
};

const createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    if (await profileNotCompleted(req.user)) {
      return res.status(400).json({ message: 'Please complete your profile' });
    }
    const newTeam = await Team.create({ name, leaderId: req.user });
    await newTeam.addMembers(req.user);
    const teamChannel = await Channel.create({ name, teamId: newTeam.id });
    await teamChannel.addParticipants(req.user);
    await teamChannel.addAdmins(req.user);

    res.status(200).json({ message: 'Successfully Created Team.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const joinTeam = async (req, res) => {
  try {
    if (await profileNotCompleted(req.user)) {
      return res.status(400).json({ message: 'Please complete your profile' });
    }
    const team = await Team.findOne({
      where: { teamCode: req.params.teamCode },
    });
    if (!team) {
      return res.status(400).json({ message: 'No team found' });
    }
    const teamChannel = await team.getChannel();
    await team.addMembers(req.user);
    await teamChannel.addParticipants(req.user);

    res.status(200).json({
      message: 'Joined Team Successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeam = async (req, res) => {
  try {
    const team = await Team.findOne({
      where: { id: req.params.teamId },
      include: {
        model: models.User,
        as: 'members',
        attributes: ['id', 'userName'],
        include: {
          model: models.Profile,
          attributes: [
            'id',
            'fullName',
            'firstName',
            'lastName',
            'image_url',
            'linkedin_url',
            'github_url',
            'twitter_url',
          ],
        },
      },
    });

    res.status(200).json({
      message: 'TeamInfo',
      data: team,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { name, members } = req.body;
    const team = await Team.findOne({
      where: { id: req.params.teamId },
    });
    const teamChannel = await team.getChannel();

    if (team.leaderId !== req.user) {
      res.status(400).json({
        message: 'Only Leader can update Team Info',
      });
    }

    if (name) {
      await team.update({ name });
      await teamChannel.update({ name });
    }
    if (members && members.length > 0) {
      await team.setMembers([...members, req.user]);
      await teamChannel.setParticipants([...members, req.user]);
    }

    res.status(200).json({
      message: 'Updated Team Successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findOne({
      where: { id: req.params.teamId },
    });
    if (team.leaderId !== req.user) {
      return res.status(400).json({
        success: 'false',
        message: 'Only Leader can delete Team',
      });
    }
    await Team.destroy({
      where: { id: req.params.teamId },
    });

    res.status(200).json({
      success: true,
      message: 'Deleted Team Successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTeam = createTeam;
exports.joinTeam = joinTeam;
exports.getTeam = getTeam;
exports.updateTeam = updateTeam;
exports.deleteTeam = deleteTeam;
