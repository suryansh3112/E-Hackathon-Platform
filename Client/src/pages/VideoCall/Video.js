import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import MicOffIcon from '@mui/icons-material/MicOff';
import Fab from '@mui/material/Fab';
import { CustomAvatar } from '../../components';

const useStyles = makeStyles({
  videoContainer: {
    position: 'relative',
    height: 300,
    width: 400,
    borderRadius: 10,
    margin: 10,
  },
  videoDimension: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  overLayName: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    zIndex: 3,
  },
  overLayIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  overLayAvatar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#36373a',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default function Video(props) {
  const { videoRef, mediaObject, fullName, image_url } = props;
  const classes = useStyles();

  return (
    <div className={classes.videoContainer}>
      <video
        controls
        className={classes.videoDimension}
        muted
        ref={videoRef}
        autoPlay
        playsInline
      />
      <p className={classes.overLayName}>{'You'}</p>
      {/* {mediaObject?.audio === false && (
        <div className={classes.overLayIcon}>
          <Fab size='small' disabled>
            <MicOffIcon fontSize='small' />
          </Fab>
        </div>
      )}
      {mediaObject?.video === false && (
        <div className={classes.overLayAvatar}>
          <CustomAvatar name='S p' size={120} />
        </div>
      )} */}
    </div>
  );
}
