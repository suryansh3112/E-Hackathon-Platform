import React from 'react';
import CustomAvatar from './CustomAvatar';
import { makeStyles } from '@mui/styles';
import { padding } from '@mui/system';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    backgroundColor: '#EEEEEE',
    padding: '10px 5px',
    borderRadius: 5,
    margin: '10px 10px',
    textAlign: 'center',
    width: 200,
  },
  img: {
    textAlign: 'center',
    backgroundColor: 'red',
  },
});
export default function UserCard(props) {
  const { user, admin } = props;
  const {
    userName,
    profile: { fullName, image_url },
  } = user;
  const navigate = useNavigate();
  const classes = useStyles();

  const handleClick = () => navigate(`/profile/${userName}`);
  return (
    <div className={classes.root} onClick={handleClick}>
      <div>
        {/* Image */}
        <CustomAvatar name={fullName} image_url={image_url} />
      </div>

      <div>
        <h3>{fullName}</h3>
        <h4>{admin ? 'Admin' : 'Member'}</h4>
      </div>
    </div>
  );
}
