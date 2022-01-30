import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from './utils';
import { useAuth } from '../../contexts/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';
import { Card } from '../../components';
import Typography from '@mui/material/Typography';
import ImageUpload from '../../components/ImageUpload';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MyProfile() {
  const classes = useStyles();
  const bioPlaceHolder =
    "This is your chance to tell us more about yourself! Things you're good at, what drives you and interesting projects you've built.";
  const { userData } = useAuth();

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    linkedin_url: '',
    github_url: '',
    twitter_url: '',
    resume_url: '',
    image_url: '',
  });

  useEffect(() => {
    const getInfo = async () => {
      const res = await getProfile(userData.user.userName, userData.token);
      if (res.success) {
        setProfileData((prev) => {
          return { ...prev, ...res.data };
        });
      } else {
        console.log(res.message);
      }
    };
    getInfo();
  }, [userData]);

  const handleChange = (event) => {
    setProfileData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleClick = async () => {
    const res = await updateProfile(profileData, userData.token);
    if (res.success) {
      alert(res.message);
    } else alert(res.message);
  };

  const saveImage = async (data) => {
    const res = await updateProfile(data, userData.token);
    if (res.success) {
      alert('Image Saved');
    } else alert(res.message);
  };

  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'white',
          }}
        >
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label='basic tabs example'
            centered
          >
            <Tab label='About' {...a11yProps(0)} />
            <Tab label='Education' {...a11yProps(1)} />
            <Tab label='Experience' {...a11yProps(2)} />
            <Tab label='Links' {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className={classes.row}>
            <Card title={'Basic Information'}>
              <TextField
                required
                label='First Name'
                name='firstName'
                value={profileData.firstName}
                onChange={handleChange}
                margin='normal'
              />
              <TextField
                required
                label='Last Name'
                name='lastName'
                value={profileData.lastName}
                onChange={handleChange}
                margin='normal'
              />
            </Card>
            <Card title={'About You'}>
              <ImageUpload
                image_url={profileData.image_url}
                setProfileData={setProfileData}
                saveImage={saveImage}
              />
              <Typography variant='subtitle1'>Bio</Typography>

              <textarea
                name='bio'
                placeholder={bioPlaceHolder}
                value={profileData.bio}
                onChange={handleChange}
                style={{ resize: 'none' }}
                rows={12}
              />
            </Card>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Three
        </TabPanel>
      </Box>
      <div className={classes.button}>
        <Button onClick={handleClick} size='large' variant='contained'>
          Update
        </Button>
      </div>
    </div>
  );
}
