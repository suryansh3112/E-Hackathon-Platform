const models = require('../models');
const User = models.User;
const Message = models.Message;
const Channel = models.Channel;

const getChannelMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: {
        channelId: req.params.channelId,
      },
      include: {
        model: models.User,
        attributes: ['id', 'userName'],
        include: {
          model: models.Profile,
          attributes: ['id', 'fullName', 'firstName', 'lastName'],
        },
      },
    });
    res.status(200).json({
      success: true,
      message: `Messages Info`,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addMessage = async (req, res) => {
  try {
    const { message, channelId } = req.body;

    if (!message || !channelId) {
      return res
        .status(400)
        .json({ success: false, message: 'Incomplete Data' });
    }

    await Message.create({ message, userId: req.user, channelId });

    res.status(200).json({
      success: true,
      message: 'Message Sent',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addMessage = addMessage;
exports.getChannelMessages = getChannelMessages;
