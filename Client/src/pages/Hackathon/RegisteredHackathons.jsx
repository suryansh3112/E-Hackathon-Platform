import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../contexts/AuthContext';
import { fetchMyHackathons } from './utils';
import { useNavigate } from 'react-router-dom';
import HackathonItem from './component/HackathonItem';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    // flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    width: 1200,
    padding: 15,
  },
  link: {
    color: '#3280d5',
    cursor: 'pointer',
  },
});

export default function RegisteredHackathons() {
  const classes = useStyles();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      const res = await fetchMyHackathons(userData.token);
      if (res.success) {
        setHackathons(res.data);
      } else {
        console.log(res.message);
      }
    };
    getInfo();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {hackathons?.length > 0 ? (
          <>
            <h1>Your hackathons</h1>
            <HackathonItem
              key={'header'}
              idx={'#'}
              HackathonName={'Hackathon'}
              teamName={'Team'}
              status={'Status'}
              header
            />
            {hackathons.map((hack, idx) => {
              return (
                <HackathonItem
                  key={idx}
                  idx={idx}
                  HackathonName={hack.hackathonName}
                  teamName={hack.teamName}
                  status={hack.status}
                />
              );
            })}
          </>
        ) : (
          <h1
            onClick={() => {
              navigate('/hackathons');
            }}
            className={classes.link}
          >
            Register for Hackathon
          </h1>
        )}
      </div>
    </div>
  );
}
