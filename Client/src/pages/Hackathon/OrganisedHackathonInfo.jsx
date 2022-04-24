import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../contexts/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Card } from '../../components';
import { fetchOrganisedHackathonById } from './utils';
import { useNavigate, useParams } from 'react-router-dom';
import TeamTab from './component/TeamTab';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#525E75',
    margin: 0,
    padding: 15,
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
export default function OrganisedHackathonInfo() {
  const classes = useStyles();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [hackathonData, setHackathonData] = useState({});

  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetchOrganisedHackathonById(
        params.hackathonId,
        userData.token
      );
      if (res.success) {
        setHackathonData(res.data);
      } else {
        console.log(res.message);
      }
    };
    getData();
  }, []);

  const handleAcceptTeam = async (teamId) => {
    console.log('+', teamId, hackathonData.id);
    setHackathonData((prev) => {
      let obj;
      prev.teams.pending = prev.teams.pending.filter((t) => {
        if (t.id === teamId) {
          obj = t;
          return false;
        }
        return true;
      });
      prev.teams.accepted.push(obj);
      return { ...prev };
    });
  };
  const handleRejectTeam = async (teamId) => {
    console.log('-', teamId, hackathonData.id);
    setHackathonData((prev) => {
      let obj;
      prev.teams.pending = prev.teams.pending.filter((t) => {
        if (t.id === teamId) {
          obj = t;
          return false;
        }
        return true;
      });
      prev.teams.rejected.push(obj);
      return { ...prev };
    });
  };
  return (
    <div className={classes.root}>
      <Box sx={{ width: '100%' }}>
        <p className={classes.title}>{hackathonData.name}</p>

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
            <Tab label='PENDING TEAMS' {...a11yProps(0)} />
            <Tab label='ACCEPTED TEAMS' {...a11yProps(1)} />
            <Tab label='REJECTED TEAMS' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TeamTab
            teams={hackathonData?.teams?.pending}
            handleAcceptTeam={handleAcceptTeam}
            handleRejectTeam={handleRejectTeam}
            isPendingTab
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TeamTab teams={hackathonData?.teams?.accepted} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TeamTab teams={hackathonData?.teams?.rejected} />
        </TabPanel>
      </Box>
    </div>
  );
}
