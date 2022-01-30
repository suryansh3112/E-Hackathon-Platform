import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from './utils';
import { useAuth } from '../../contexts/AuthContext';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: '0 auto 0',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
  },
  flexOne: {
    flex: 1,
  },
});
export default function DisplayProfile() {
  const classes = useStyles();

  const params = useParams();
  const { userData } = useAuth();

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      const res = await getProfile(params.userName, userData.token);
      if (res.success) {
        setProfileData(res.data);
      } else {
        console.log(res.message);
      }
    };
    getInfo();
  }, []);
  if (!profileData) return <div>No Data Found</div>;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1>
          {profileData?.fullName ? profileData.fullName : params.userName}
        </h1>
        <div>Social icons</div>
      </div>

      <h2>{profileData?.bio}</h2>

      <div className={classes.flex}>
        <div className={classes.flexOne}>
          <div>Projects</div>
        </div>
        <div className={classes.flexOne}>Skills</div>
      </div>
    </div>
  );
}
