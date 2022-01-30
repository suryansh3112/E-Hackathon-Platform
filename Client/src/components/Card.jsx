import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  flexOne: {
    flexGrow: 1,
    paddingRight: 20,
    paddingLeft: 20,
    maxWidth: 600,
    boxSizing: 'border-box',
  },
  card: {
    padding: 40,
    boxShadow: 'rgb(0 0 0 / 8%) 0px 1px 4px 0px',
    backgroundColor: '#fff',
    // maxWidth: 600,
    borderRadius: 8,
    // boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
});

function Card({ title, children }) {
  const classes = useStyles();

  return (
    <div className={classes.flexOne}>
      {title?.length > 0 && <p className={classes.title}>{title}</p>}
      <div className={classes.card}>{children}</div>
    </div>
  );
}

export default Card;
