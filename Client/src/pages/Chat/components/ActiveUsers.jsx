import React from 'react';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  root: {
    // flexGrow: 0.8,
    backgroundColor: 'yellow',
  },
});
export default function ActiveUsers() {
  const classes = useStyles();

  return <div className={classes.root}></div>;
}
