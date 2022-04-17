import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { makeStyles } from '@mui/styles';
import Peer from 'simple-peer';
import VideoFooter from './VideoFooter';
import Video from './Video';
import PeerVideo from './PeerVideo';
import { useSocket } from '../../contexts/SocketContext';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  videoContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#202124',
  },
  flex_1: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  btn: {
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
});

export default function VideoCall(props) {
  const classes = useStyles();
  const socket = useSocket();
  const userVideo = useRef();
  const params = useParams();
  const { userData } = useAuth();
  const isscreenSharingMode = params?.type === 'screen';

  const [peers, setPeers] = useState([]);
  const peersRef = useRef([]);

  const [mediaObject, setMediaObject] = useState({
    video: false,
    audio: false,
  });

  const leaveCall = () => {
    socket.emit('disconnect-video-call');
    window.close();
  };

  useEffect(() => {
    return () => {
      socket.off('all-users');
      socket.off('user-joined');
      socket.off('receiving-returned-signal');
      socket.off('user-left');
    };
  }, []);

  useEffect(() => {
    const handleStream = (stream) => {
      userVideo.current.srcObject = stream;
      stream.getTracks().map((track) => (track.enabled = false));
      socket.emit('join-video-call', params.videoRoomId);
      socket.on('all-users', (users) => {
        const peers = [];
        users.forEach((user) => {
          const peer = createPeer(user.id, userData.user.id, stream);
          const peerObj = {
            peerID: user.id,
            peer,
            fullName: user.fullName,
            image_url: user.image_url,
          };
          peersRef.current.push(peerObj);
          peers.push(peerObj);
        });
        setPeers(peers);
      });

      socket.on('user-joined', (payload) => {
        console.log('user-joined', payload);
        const peer = addPeer(payload.signal, payload.callerID, stream);
        const peerObj = {
          peerID: payload.callerID,
          peer,
          ...payload.userInfo,
        };
        peersRef.current.push(peerObj);

        setPeers((users) => [...users, peerObj]);
      });

      socket.on('receiving-returned-signal', (payload) => {
        console.log('receiving-returned-signal', payload);
        const item = peersRef.current.find((p) => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });

      socket.on('user-left', (leavedUserId) => {
        console.log(peersRef.current.length, 'userLeft');
        const peersObj = peersRef.current.find(
          (peer) => peer.peerID === leavedUserId
        );
        if (peersObj) {
          peersObj.peer.destroy();
        }
        const updatedPeers = peersRef.current.filter(
          (peer) => peer.peerID !== leavedUserId
        );
        console.log(updatedPeers, 'updatedPeers');
        peersRef.current = updatedPeers;
        setPeers(updatedPeers);
      });
    };
    if (socket) {
      console.log(params?.type);
      if (isscreenSharingMode) {
        navigator.mediaDevices
          .getDisplayMedia({
            cursor: true,
          })
          .then(handleStream);
      } else {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then(handleStream);
      }
    }
  }, [socket]);

  useEffect(() => {
    if (userVideo?.current?.srcObject?.getTracks) {
      const tracks = userVideo.current.srcObject.getTracks?.();
      const videoTrack = tracks?.find((track) => track?.kind === 'video');
      const audioTrack = tracks?.find((track) => track?.kind === 'audio');
      if (videoTrack) {
        videoTrack.enabled = mediaObject.video;
      }
      if (audioTrack) {
        audioTrack.enabled = mediaObject.audio;
      }
    }
  }, [mediaObject]);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('sending-signal', {
        userToSignal,
        callerID,
        signal,
        userInfo: {
          fullName: userData.user.fullName,
          image_url: userData.user.image_url,
        },
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('returning-signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div className={classes.videoContainer}>
      <p className={classes.name}>{params.channelName || 'Video Call'}</p>

      <div className={classes.flex_1}>
        <Video
          videoRef={userVideo}
          mediaObject={mediaObject}
          fullName={userData?.user?.fullName || 'You'}
          image_url={userData?.user?.image_url}
        />
        {peers.map((peer, index) => {
          return (
            <PeerVideo
              key={peer.peerID}
              peer={peer.peer}
              fullName={peer.fullName}
              image_url={peer.image_url}
            />
          );
        })}
      </div>
      <VideoFooter
        mediaObject={mediaObject}
        setMediaObject={setMediaObject}
        leaveCall={leaveCall}
      />
    </div>
  );
}
