import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  flexOne: {
    flexGrow: ({ width }) => (width ? 0 : 1),
    padding: 20,
    maxWidth: 600,
    boxSizing: 'border-box',
    width: ({ width }) => (width ? width : 'auto'),
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    flexGrow: 1,
    padding: 40,
    boxShadow: 'rgb(0 0 0 / 8%) 0px 1px 4px 0px',
    backgroundColor: '#fff',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: ({ centered }) => (centered ? 'center' : 'stretch'),
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
});

function Card(props) {
  const { title, children, width, centered } = props;
  const classes = useStyles({ width, centered });

  return (
    <div className={classes.flexOne}>
      {title?.length > 0 && <p className={classes.title}>{title}</p>}
      <div className={classes.card}>{children}</div>
    </div>
  );
}

export default Card;
