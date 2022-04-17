import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../contexts/AuthContext';
import { fetchAllHackathons, applyForHackathon } from './utils';
import { Button, Typography } from '@mui/material';
import { Card } from '../../components';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

export default function Hackathons() {
  const classes = useStyles();
  const {
    userData: { token },
  } = useAuth();
  const [hackathonDataArray, setHackathonDataArray] = useState(null);
  const [open, setOpen] = useState(false);
  const [applyData, setApplyData] = useState({
    hackathonId: '',
    teamCode: '',
  });

  const handleClickOpen = (id) => {
    setOpen(true);
    setApplyData({
      hackathonId: id,
      teamCode: '',
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetchAllHackathons(token);
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

  const handleApplyNow = async () => {
    const res = await applyForHackathon(applyData, token);
    if (res.success) {
      alert(res.message);
    } else {
      alert(res.message);
    }
    handleClose();
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
                <Button
                  onClick={() => handleClickOpen(id)}
                  size='large'
                  variant='contained'
                  sx={{ mt: 'auto' }}
                >
                  Apply Now
                </Button>
              </Card>
            );
          })
        ) : (
          <h1>No Hackathons Available</h1>
        )}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Apply Now</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To apply to this hackathon, please enter your teamCode here. We will
            send updates accordingly.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Team Code'
            type='email'
            fullWidth
            variant='standard'
            value={applyData.teamCode}
            onChange={(e) =>
              setApplyData((prev) => ({ ...prev, teamCode: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApplyNow}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
