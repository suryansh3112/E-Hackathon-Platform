import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { getTeam } from './utils';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { useNavigate, useParams } from 'react-router-dom';
import UserCard from '../../components/UserCard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  wrapper: {
    margin: '0 auto',
    maxWidth: 1000,
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
  },
  members: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  heading: {
    textAlign: 'center',
  },
  code: {
    backgroundColor: '#eeeeee',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  copy: {
    padding: '0 10px',
    boxShadow: 'rgb(0 0 0 / 8%) 0px 1px 4px 0px',
    backgroundColor: '#fff',
    borderRadius: 5,
    alignSelf: 'flex-start',
    display: 'flex',
    alignItems: 'center',
  },
});

export default function TeamInfo() {
  const classes = useStyles();
  const { userData } = useAuth();
  const [team, setTeam] = useState(null);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await getTeam(params.teamId, userData.token);
        if (res?.data) {
          setTeam(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getInfo();
  }, [userData]);

  if (!team) {
    return <h1>No Data Found</h1>;
  }

  const { name, teamCode, members } = team;
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <h1 className={classes.heading}>{name}</h1>

        <h3>Invite Code </h3>
        <div className={classes.copy}>
          <p className={classes.code}>{teamCode}</p>
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(teamCode);
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </div>
        <h1>Team Members</h1>
        <div className={classes.members}>
          {members.map((member, idx) => {
            return (
              <UserCard
                user={member}
                admin={member.id === team.leaderId}
                key={idx}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
