import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  flex1: {
    flex: 1,
  },
  mr20: {
    marginRight: 20,
  },
  status: {
    color: '#fff',
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: '#525E75',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const hackathonStatus = {
  0: 'PENDING',
  1: 'ACCEPTED',
  2: 'REJECTED',
};

export default function HackathonItem(props) {
  const { idx, HackathonName, teamName, status, header } = props;
  const classes = useStyles();
  const getStatusColor = () => {
    let color = '#5b686c';
    switch (status) {
      case 0:
        color = '#5b686c';
        break;
      case 1:
        color = '#d7be81';
        break;
      case 2:
        color = '#f06443';
        break;
    }
    return { backgroundColor: color };
  };
  return (
    <div className={`${classes.root} ${header && classes.header}`}>
      <div className={classes.flex1}>
        <p className={`${header && classes.headerText}`}>
          <span className={classes.mr20}>{idx}.</span> {HackathonName}
        </p>
      </div>
      <div className={classes.flex1}>
        <p className={`${header && classes.headerText}`}>{teamName}</p>
      </div>
      <div className={classes.flex1}>
        {header ? (
          <p className={`${header && classes.headerText}`}>{status}</p>
        ) : (
          <span className={classes.status} style={getStatusColor()}>
            {hackathonStatus[status]}
          </span>
        )}
      </div>
    </div>
  );
}
