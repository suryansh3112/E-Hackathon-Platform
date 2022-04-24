import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { getTeam, deleteTeam } from './utils';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { useNavigate, useParams } from 'react-router-dom';
import UserCard from '../../components/UserCard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    margin: '0 auto',
    // maxWidth: 1000,
    justifyContent: 'center',
  },
  wrapper: {
    margin: '20px 0',
    padding: 40,
    width: 900,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eee',
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
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50,
  },
});

export default function TeamInfo() {
  const classes = useStyles();
  const { userData } = useAuth();
  const [team, setTeam] = useState(null);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const params = useParams();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTeam = async () => {
    const res = await deleteTeam(params.teamId, userData.token);
    if (res.success) {
      alert(res.message);
    } else {
      alert(res.message);
    }
    handleClose();
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await getTeam(params.teamId, userData.token);
        if (res?.data) {
          setTeam(res.data);
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

  const { name, teamCode, members, leaderId } = team;
  const isAdmin = userData.user.id === leaderId;

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <h1 className={classes.heading}>{name}</h1>
        {isAdmin && (
          <>
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
          </>
        )}
        <h1>Team Members</h1>
        <div className={classes.members}>
          {members.map((member, idx) => {
            return (
              <UserCard
                user={member}
                admin={member.id === leaderId}
                key={idx}
              />
            );
          })}
        </div>
      </div>
      {isAdmin && (
        <div className={classes.btnGroup}>
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(teamCode);
            }}
            size='large'
            color='primary'
            sx={{ mb: 2 }}
          >
            <ModeEditOutlineIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton onClick={handleClickOpen} size='large' color='error'>
            <DeleteIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id='alert-dialog-title'>
          {`Delete Team ${name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {`Are you sure you want to delete team ${name}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDeleteTeam} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
