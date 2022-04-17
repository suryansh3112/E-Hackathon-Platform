import React from 'react';
import { makeStyles } from '@mui/styles';
import Fab from '@mui/material/Fab';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import CallEndIcon from '@mui/icons-material/CallEnd';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles({
  videoFooter: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default function VideoFooter(props) {
  const { mediaObject, setMediaObject, leaveCall } = props;
  const { video, audio } = mediaObject || {};
  const classes = useStyles();

  return (
    <div className={classes.videoFooter}>
      <Fab
        style={{ marginLeft: 10 }}
        size='medium'
        color={audio ? 'default' : 'error'}
        onClick={() =>
          setMediaObject((prev) => ({ ...prev, audio: !prev.audio }))
        }
      >
        {audio ? <KeyboardVoiceIcon /> : <MicOffIcon />}
      </Fab>

      <Fab
        style={{ marginLeft: 10 }}
        size='medium'
        color={video ? 'default' : 'error'}
        onClick={() =>
          setMediaObject((prev) => ({ ...prev, video: !prev.video }))
        }
      >
        {video ? <VideocamIcon /> : <VideocamOffIcon />}
      </Fab>

      <Fab
        style={{ marginLeft: 10 }}
        size='large'
        color='error'
        variant='extended'
        onClick={leaveCall}
      >
        <CallEndIcon />
      </Fab>

      {/* {
        <Fab
          style={{ marginLeft: 10 }}
          size='medium'
          color={audio ? 'default' : 'error'}
          onClick={() =>
            setMediaObject((prev) => ({ ...prev, audio: !prev.audio }))
          }
        >
          {audio ? <KeyboardVoiceIcon /> : <MicOffIcon />}
        </Fab>
      } */}
    </div>
  );
}
