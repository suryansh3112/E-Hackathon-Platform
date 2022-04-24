import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card } from '../../../components';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 1200,
    margin: '20px auto 0',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#273339',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#8e989c',
    marginTop: 20,
  },
  size_16: {
    fontSize: 20,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  click: {
    '&:hover': {
      color: '#08c',
      cursor: 'pointer',
    },
  },
});

export default function TeamTab(props) {
  const { teams, handleAcceptTeam, handleRejectTeam, isPendingTab } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  if (!teams?.length > 0) {
    return null;
  }
  return (
    <div className={classes.root}>
      {teams.map((team) => {
        return (
          <Card width={400} key={team.id}>
            <p
              className={classes.click}
              onClick={() => navigate(`/teams/${team.id}`)}
            >
              <span className={`${classes.label} ${classes.click}`}>
                Team :
              </span>{' '}
              <span className={`${classes.title} ${classes.click}`}>
                {team.name}
              </span>
            </p>
            <p>
              <span className={`${classes.label} ${classes.size_16}`}>
                Team Size :
              </span>{' '}
              <span className={`${classes.title} ${classes.size_16}`}>
                {team.members}
              </span>
            </p>

            {isPendingTab && (
              <div className={classes.footer}>
                <Fab
                  onClick={() => handleAcceptTeam(team.id)}
                  size='medium'
                  color='success'
                  aria-label='add'
                  sx={{ zIndex: 5 }}
                >
                  <CheckIcon />
                </Fab>
                <Fab
                  onClick={() => handleRejectTeam(team.id)}
                  size='medium'
                  color='error'
                  aria-label='add'
                  sx={{ zIndex: 5 }}
                >
                  <ClearIcon />
                </Fab>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
