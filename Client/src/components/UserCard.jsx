import React from 'react';
import CustomAvatar from './CustomAvatar';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { Card } from '.';
import Socials from './Socials';
const useStyles = makeStyles({
  name: {
    fontSize: 20,
    fontWeight: 600,
  },
  subText: {
    fontSize: 14,
    fontWeight: 400,
    color: '#8b9497',
    margin: 0,
    marginBottom: 10,
  },
});
export default function UserCard(props) {
  const { user, admin } = props;
  const {
    userName,
    profile: { fullName, image_url, linkedin_url, github_url, twitter_url },
  } = user;
  const navigate = useNavigate();
  const classes = useStyles();

  const handleClick = () => navigate(`/profile/${userName}`);

  return (
    <Card width={300} centered>
      <CustomAvatar
        name={fullName}
        image_url={image_url}
        onClickHandler={handleClick}
      />
      <p className={classes.name}>{fullName}</p>
      <p className={classes.subText}>{admin ? 'Admin' : 'Member'}</p>
      <Socials
        github_url={github_url}
        twitter_url={twitter_url}
        linkedin_url={linkedin_url}
        size={30}
      />
    </Card>
  );
}
