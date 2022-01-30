import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { getAllTeams, createTeam, joinTeam } from './utils';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from '../../contexts/SnackbarContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Constants from '../../common/Constants';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: 20,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  flexOne: {
    flex: 1,
  },
  flexAlign: {
    display: 'flex',
    alignItems: 'center',
  },
  orText: {
    fontSize: 20,
    fontWeight: 600,
    margin: '20px 0',
    textAlign: 'center',
  },
  btn: {
    marginTop: 10,
  },
});
export default function Teams() {
  const classes = useStyles();
  const { userData } = useAuth();
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await getAllTeams(userData.token);
        if (res?.data) {
          setTeams(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getInfo();
  }, [userData]);

  const handleCreate = async () => {
    try {
      const res = await createTeam({ name: teamName }, userData.token);
      showSnackbar(res.message);
    } catch (error) {
      const message =
        error?.response?.data?.message || Constants.strings.somethingWentWrong;
      showSnackbar(message, 'error');
    }
  };
  const handleJoin = async () => {
    try {
      const res = await joinTeam(teamCode, userData.token);
      showSnackbar(res.message);
    } catch (error) {
      const message =
        error?.response?.data?.message || Constants.strings.somethingWentWrong;
      showSnackbar(message, 'error');
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Card>
          <h1>Teams</h1>
          {teams?.length > 0 ? (
            <List>
              {teams.map((team, idx) => {
                return (
                  <ListItem key={idx} disablePadding>
                    <ListItemButton component={Link} to={`/teams/${team.id}`}>
                      <ListItemIcon>
                        <GroupsOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary={team.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h1>No Teams Found</h1>
          )}
        </Card>
        <Card>
          <TextField
            required
            label='Team Name'
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className={classes.btn}
          />
          <div className={classes.btn}>
            <Button onClick={handleCreate} variant='contained' fullWidth>
              Create Team
            </Button>
          </div>
          <p className={classes.orText}>OR</p>
          <TextField
            required
            label='Team Code'
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
          />
          <div className={classes.btn}>
            <Button onClick={handleJoin} variant='contained' fullWidth>
              Join Team
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
