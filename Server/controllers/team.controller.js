const models = require('../models');
const User = models.User;
const Team = models.Team;

const createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;
    const newTeam = await Team.create({ name, leaderId: req.user });
    const allMembers = [...members, req.user];
    await newTeam.addMembers(allMembers);

    res.status(200).json({ message: 'Successfully Created Team.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeam = async (req, res) => {
  try {
    const team = await Team.findOne({
      where: { name: req.params.teamName },
      include: [
        {
          model: models.User,
          as: 'leader',
          attributes: ['id', 'userName']
        },
        {
          model: models.User,
          as: 'members',
          attributes: ['id', 'userName']
        }
      ]
    });

    res.status(200).json({
      message: 'TeamInfo',
      data: team
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { name, members } = req.body;
    const team = await Team.findOne({
      where: { name: req.params.teamName }
    });

    if (team.leaderId !== req.user) {
      res.status(400).json({
        message: 'Only Leader can update Team Info'
      });
    }

    if (name) {
      await team.update({ name });
    }
    if (members && members.length > 0) {
      await team.setMembers([...members, req.user]);
    }

    res.status(200).json({
      message: 'Updated Team Successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findOne({
      where: { name: req.params.teamName }
    });
    if (team.leaderId !== req.user) {
      res.status(400).json({
        message: 'Only Leader can delete Team'
      });
      return;
    }

    await Team.destroy({
      where: { name: req.params.teamName }
    });

    res.status(200).json({
      message: 'Deleted Team Successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTeam = createTeam;
exports.getTeam = getTeam;
exports.updateTeam = updateTeam;
exports.deleteTeam = deleteTeam;
