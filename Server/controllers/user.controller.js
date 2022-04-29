const models = require('../models');
const User = models.User;
const Profile = models.Profile;
const Channel = models.Channel;
const Hackathon = models.Hackathon;
const Hackathon_Team = models.Hackathon_Team;
const Team = models.Team;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

//------------------------------------------------------REGISTER------------------------------------------------------
const register = async (req, res) => {
  try {
    let { userName, email, password, confirmPassword } = req.body;

    //===========================Validation===========================

    if (!userName || !email || !password || !confirmPassword)
      return res
        .status(400)
        .json({ message: 'Not all fields have been entered.' });

    const existingEmail = await User.findOne({ where: { email: email } });
    if (existingEmail)
      return res
        .status(400)
        .json({ message: 'An account with this email already exists.' });

    const existingUserName = await User.findOne({
      where: { userName: userName },
    });
    if (existingUserName)
      return res
        .status(400)
        .json({ message: 'This userName is already registered.' });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: 'The password needs to be atleast 6 characters.' });
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: 'Please enter the same password twice' });

    //========================SAVING-USER=======================================

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const savedUser = await User.create({
      userName,
      email,
      password: passwordHash,
    });
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//----------------------------------------------------------LOGIN-----------------------------------------------------
const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password)
      return res
        .status(400)
        .json({ message: 'Not all fields have been entered.' });

    //Checking for registered email or username and assigning it to "user"
    let user;
    const usernameCheck = await User.findOne({
      where: { userName: emailOrUsername },
    });

    if (usernameCheck) {
      user = usernameCheck;
    } else {
      const emailCheck = await User.findOne({
        where: { email: emailOrUsername },
      });
      if (emailCheck) {
        user = emailCheck;
      } else {
        return res.status(400).json({
          message: 'No account with this email or username is registered.',
        });
      }
    }

    //Checking password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid Credentials' });

    //Assigning Json Web Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    // , {expiresIn: '3h'}
    const profile = await user.getProfile();
    res.status(200).json({
      token,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        fullName: profile?.fullName,
        image_url: profile?.image_url,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findByPk(req.user);

    let profile = await user.getProfile();
    if (!profile) {
      profile = await Profile.create({ ...data, userId: req.user });
    } else {
      await profile.update(data);
    }
    profile = profile.dataValues;
    if (profile.firstName && profile.lastName) {
      await user.update({ profileCompleted: true });
    } else {
      await user.update({ profileCompleted: false });
    }

    res.status(200).json({
      success: true,
      message: 'Updated Profile Successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { userName: req.params.userName },
    });
    const profile = await user.getProfile();
    res.status(200).json({
      success: true,
      message: 'Profile Info',
      data: profile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// //-----------------------------------------------TOKEN-IS-VALID---------------------------------------------------------
const tokenIsValid = async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json({ status: false });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json({ status: false });
    }
    const user = await User.findByPk(verified.id);
    const profile = await user.getProfile();
    return res.json({
      status: true,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        fullName: profile?.fullName,
        image_url: profile?.image_url,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserChannel = async (req, res) => {
  try {
    // const user = await User.findByPk(req.user);
    // const channel = await user.getChannels();
    const channel = await Channel.findAll({
      include: [
        {
          model: models.User,
          as: 'participants',
          where: { id: req.user },
          attributes: [],
        },
        {
          model: models.Message,
          include: {
            model: models.User,
            attributes: ['id', 'userName'],
            include: {
              model: models.Profile,
              attributes: [
                'id',
                'fullName',
                'firstName',
                'lastName',
                'image_url',
              ],
            },
          },
        },
      ],
    });
    res.status(200).json({
      success: true,
      message: 'Channels Info',
      data: channel,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserTeams = async (req, res) => {
  try {
    const user = await User.findByPk(req.user);
    const teams = await user.getAllTeams();
    res.status(200).json({
      message: 'Channels Info',
      data: teams,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRegisteredHackathons = async (req, res) => {
  try {
    const user = await User.findByPk(req.user);
    const teams = await user.getAllTeams();
    const teamIds = teams.map((t) => t.id);
    const hacks = await Team.findAll({
      where: { id: { [Op.in]: teamIds } },
      include: {
        model: models.Hackathon,
        attributes: ['id', 'name', 'hackathonStartDate', 'hackathonEndDate'],
      },
    });

    const result = hacks.reduce((prev, curr) => {
      const teamName = curr.name;
      const teamId = curr.id;
      const data = curr.hackathons.map((item) => {
        const formattedData = {
          teamName,
          teamId,
          hackathonName: item.name,
          hackathonId: item.id,
          hackathonStartDate: item.hackathonStartDate,
          hackathonEndDate: item.hackathonEndDate,
          status: item?.Hackathon_Team.status || 0,
        };
        return formattedData;
      });
      return [...prev, ...data];
    }, []);

    res.status(200).json({
      message: 'Registered Hackathons',
      data: result,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addUserAndProfile = async (data) => {
  const { firstName, lastName, userName, passwordHash } = data;
  const user = await User.create({
    userName,
    email: `${userName}@gmail.com`,
    password: passwordHash,
    profileCompleted: true,
  });
  const profile = await Profile.create({
    firstName,
    lastName,
    userId: user.id,
  });
  return user;
};

const addInitialTeam = async (data) => {
  const { name, users } = data;
  const newTeam = await Team.create({ name, leaderId: users[0] });
  await newTeam.addMembers(users);
  const teamChannel = await Channel.create({
    name,
    teamId: newTeam.id,
  });
  await teamChannel.addParticipants(users);
  await teamChannel.addAdmins(users[0]);
};

const addHackathon = async (data, userId, gap) => {
  const { name, applicationStartDate } = data;
  const date = new Date();

  const newHackathon = await Hackathon.create({
    ...data,
    applicationEndDate: date.setDate(applicationStartDate.getDate() + 7),
    hackathonStartDate: date.setDate(applicationStartDate.getDate() + gap),
    hackathonEndDate: date.setDate(applicationStartDate.getDate() + gap + 2),
    organiserId: userId,
  });
  const newHackathonChannel = await Channel.create({
    name,
    hackathonId: newHackathon.id,
  });
  await newHackathonChannel.addParticipants(userId);
  await newHackathonChannel.addAdmins(userId);
};

const hackData = [
  {
    name: 'Byte Synergy',
    tagLine: 'One of a Kind',
    minTeamSize: 2,
    maxTeamSize: 4,
    applicationStartDate: new Date(),
    website_url: 'https://synergy.iiitb.ac.in/ByteSynergy/',
  },
  {
    name: 'Hack Overflow',
    tagLine: "India's biggest hackathon",
    minTeamSize: 2,
    maxTeamSize: 4,
    applicationStartDate: new Date(),
    website_url: 'https://hackathon.hackoverflow.in/',
  },
];

const loadUsersInitialData = [
  { userName: 'creator', firstName: 'Creator', lastName: 'Hack' },
  { userName: 'suryansh', firstName: 'Suryansh', lastName: 'Purohit' },
  { userName: 'rahul', firstName: 'Rahul', lastName: 'Shinde' },
  { userName: 'sahil', firstName: 'Sahil', lastName: 'Jain' },
  { userName: 'harsh', firstName: 'Harsh', lastName: 'Panchal' },
  { userName: 'sanath', firstName: 'Sanath', lastName: 'Shetty' },
  { userName: 'ganesh', firstName: 'Ganesh', lastName: 'Reddy' },
  { userName: 'ayush', firstName: 'Ayush', lastName: 'Tomar' },
  { userName: 'sudheer', firstName: 'Sudheer', lastName: 'Tripathi' },
];

const loadInitialData = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash('test123', salt);

    const creator = await addUserAndProfile({
      ...loadUsersInitialData[0],
      passwordHash,
    });
    const u1 = await addUserAndProfile({
      ...loadUsersInitialData[1],
      passwordHash,
    });
    const u2 = await addUserAndProfile({
      ...loadUsersInitialData[2],
      passwordHash,
    });
    const u3 = await addUserAndProfile({
      ...loadUsersInitialData[3],
      passwordHash,
    });
    const u4 = await addUserAndProfile({
      ...loadUsersInitialData[4],
      passwordHash,
    });
    const u5 = await addUserAndProfile({
      ...loadUsersInitialData[5],
      passwordHash,
    });
    const u6 = await addUserAndProfile({
      ...loadUsersInitialData[6],
      passwordHash,
    });
    const u7 = await addUserAndProfile({
      ...loadUsersInitialData[7],
      passwordHash,
    });
    const u8 = await addUserAndProfile({
      ...loadUsersInitialData[8],
      passwordHash,
    });

    const t1 = await addInitialTeam({
      name: 'Hex Clan',
      users: [u1.id, u2.id],
    });
    const t2 = await addInitialTeam({
      name: 'Zip Demons',
      users: [u3.id, u4.id],
    });
    const t3 = await addInitialTeam({
      name: 'Debug Entity',
      users: [u5.id, u6.id],
    });
    const t4 = await addInitialTeam({
      name: 'Static Startup',
      users: [u7.id, u8.id],
    });

    const h1 = await addHackathon(hackData[0], creator.id, 14);
    const h2 = await addHackathon(hackData[1], creator.id, 20);

    res.status(200).json({
      message: 'Load Success',
      data: '',
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//------------------------------------------------EXPORTS-----------------------------------------------------------
exports.register = register;
exports.login = login;
exports.tokenIsValid = tokenIsValid;
exports.getUserChannel = getUserChannel;
exports.updateProfile = updateProfile;
exports.getProfile = getProfile;
exports.getUserTeams = getUserTeams;
exports.getRegisteredHackathons = getRegisteredHackathons;
exports.loadInitialData = loadInitialData;
