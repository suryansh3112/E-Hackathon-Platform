import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from './utils';
import { useAuth } from '../../contexts/AuthContext';
import { makeStyles } from '@mui/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { CustomAvatar } from '../../components';
import Link from '@mui/material/Link';
import Socials from '../../components/Socials';
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 800,
    padding: '48px 80px',
    margin: '40px auto 0',
    boxShadow: 'rgb(0 0 0 / 8%) 0px 1px 4px 0px',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: 600,
    fontFamily: 'Lato',
    flexGrow: 1,
    marginLeft: 20,
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
  const {
    linkedin_url,
    github_url,
    twitter_url,
    resume_url,
    image_url,
    fullName,
  } = profileData;

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <div className={classes.header}>
          <div>
            <CustomAvatar image_url={image_url} name={fullName} size={64} />
          </div>
          <p className={classes.name}>
            {fullName ? fullName : params.userName}
          </p>
          <Socials
            github_url={github_url}
            twitter_url={twitter_url}
            linkedin_url={linkedin_url}
          />
        </div>
      </div>
    </div>
  );
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1>
          {profileData?.fullName ? profileData.fullName : params.userName}
        </h1>
        <div>{}</div>
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
