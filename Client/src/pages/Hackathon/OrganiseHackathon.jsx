import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../contexts/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Card } from '../../components';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Stack from '@mui/material/Stack';
import { createHackathon } from './utils';
import { useNavigate } from 'react-router-dom';

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
  mb_10: {
    // marginBottom: 100,
    margin: '0 40px',
    color: '#000',
    backgroundColor: 'red',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
export default function OrganiseHackathon() {
  const classes = useStyles();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [hackathonData, setHackathonData] = useState({
    name: '',
    tagLine: '',
    minTeamSize: '',
    maxTeamSize: '',
    applicationStartDate: new Date(),
    applicationEndDate: '',
    hackathonStartDate: '',
    hackathonEndDate: '',
    website_url: '',
    about: '',
  });

  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    setHackathonData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleClick = async () => {
    const res = await createHackathon(hackathonData, userData.token);
    if (res.success) {
      alert(res.message);
      navigate('/hackathons');
    } else {
      alert(res.message);
    }
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
            <Tab label='Basics' {...a11yProps(0)} />
            <Tab label='Links' {...a11yProps(1)} />
            <Tab label='Dates' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className={classes.row}>
            <Card>
              <TextField
                required
                label='Name'
                name='name'
                value={hackathonData.name}
                onChange={handleChange}
                margin='normal'
              />
              <TextField
                required
                label='TagLine'
                name='tagLine'
                value={hackathonData.tagLine}
                onChange={handleChange}
                margin='normal'
                placeholder="e.g. India's biggest hackathon"
              />
              <TextField
                required
                label='MIN. TEAM SIZE ALLOWED'
                name='minTeamSize'
                value={hackathonData.minTeamSize}
                onChange={handleChange}
                margin='normal'
                placeholder='e.g. 2'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
              <TextField
                required
                label='MAX. TEAM SIZE ALLOWED'
                name='maxTeamSize'
                value={hackathonData.maxTeamSize}
                onChange={handleChange}
                margin='normal'
                placeholder='e.g. 4'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
            </Card>
            <Card>
              <Typography variant='subtitle1'>ABOUT</Typography>

              <textarea
                name='about'
                placeholder={'aboutPlaceHolder'}
                value={hackathonData.about}
                onChange={handleChange}
                style={{ resize: 'none' }}
                rows={12}
              />
            </Card>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Card>
            <TextField
              label="Hackathon's Website"
              name='website_url'
              value={hackathonData.website_url}
              onChange={handleChange}
              margin='normal'
            />
          </Card>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Card>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label='Application Opens'
                  value={hackathonData.applicationStartDate}
                  onChange={(newValue) => {
                    setHackathonData((prev) => ({
                      ...prev,
                      applicationStartDate: newValue,
                    }));
                  }}
                />
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label='Application Closes'
                  value={hackathonData.applicationEndDate}
                  onChange={(newValue) => {
                    setHackathonData((prev) => ({
                      ...prev,
                      applicationEndDate: newValue,
                    }));
                  }}
                />
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label='Hackathon Begins'
                  value={hackathonData.hackathonStartDate}
                  onChange={(newValue) => {
                    setHackathonData((prev) => ({
                      ...prev,
                      hackathonStartDate: newValue,
                    }));
                  }}
                />
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label='Hackathon Ends'
                  value={hackathonData.hackathonEndDate}
                  onChange={(newValue) => {
                    setHackathonData((prev) => ({
                      ...prev,
                      hackathonEndDate: newValue,
                    }));
                  }}
                />
              </Stack>
            </LocalizationProvider>
          </Card>
        </TabPanel>
      </Box>

      <div className={classes.button}>
        <Button onClick={handleClick} size='large' variant='contained'>
          Create
        </Button>
      </div>
    </div>
  );
}
