import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../contexts/AuthContext';
import { fetchMyOrganisedHackathon } from './utils';
import { Card } from '../../components';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    maxWidth: 1200,
    margin: '20px auto 0',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#273339',
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#8e989c',
    marginTop: 20,
  },
  tagLine: {
    fontWeight: 400,
    fontSize: 16,
    color: '#8e989c',
    marginTop: 5,
  },
  dates: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 18,
    color: '#273339',
  },
  mb_24: {
    marginBottom: 24,
  },
});

export default function MyOrganisedHackathons() {
  const classes = useStyles();
  const {
    userData: { token },
  } = useAuth();
  const [hackathonDataArray, setHackathonDataArray] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const res = await fetchMyOrganisedHackathon(token);
      if (res.success) {
        setHackathonDataArray(res.data);
      } else {
        console.log(res.message);
      }
    };
    getData();
  }, []);

  const getDate = (date) => {
    const t = new Date(date);
    return t.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleClick = (id) => {
    navigate(`/organized-hackathon/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {hackathonDataArray?.length > 0 ? (
          hackathonDataArray.map((data) => {
            if (!data) return null;
            const {
              id,
              name,
              tagLine,
              hackathonStartDate,
              hackathonEndDate,
              applicationEndDate,
              website_url,
            } = data;
            return (
              <div key={id} onClick={() => handleClick(id)}>
                <Card width={400} key={id}>
                  <a
                    href={website_url}
                    target='_blank'
                    style={{ textDecoration: 'none' }}
                  >
                    <span className={classes.title}>{name}</span>
                  </a>
                  {tagLine?.length > 0 && (
                    <span className={classes.tagLine}>#{tagLine}</span>
                  )}
                  <span className={classes.subTitle}>Starts</span>
                  <span className={classes.dates}>
                    {getDate(hackathonStartDate)}
                  </span>
                  <span className={classes.subTitle}>Ends</span>
                  <span className={classes.dates}>
                    {getDate(hackathonEndDate)}
                  </span>
                  <span className={classes.subTitle}>Application Closes</span>
                  <span className={`${classes.dates} ${classes.mb_24}`}>
                    {getDate(applicationEndDate)}
                  </span>
                </Card>
              </div>
            );
          })
        ) : (
          <h1>No Hackathons Available</h1>
        )}
      </div>
    </div>
  );
}
