import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../providers/Socket';
import { usePeer } from '../../providers/Peer';
import ReactPlayer from 'react-player';
import ManagementScreen from './ManagementScreen';
import DetailScreen from './DetailScreen';

const MeetingScreen = () => {
  const navigate = useNavigate();
  const date = new Date();
  const [myStream, setMyStream] = useState(null);
  const [remoteEmail, setRemoteEmail] = useState();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const {
    peer,
    createOffer,
    createAnswer,
    setRemoteAnswer,
    sendStream,
    remoteStream,
  }: any = usePeer();
  const { socket }: any = useSocket();
  const handleNewUserJoinedRoom = async (data: any) => {
    const { emailId } = data;
    console.log('This is new user room id: ', emailId);
    const offer = await createOffer();
    socket.emit('call-user', { emailId, offer });
    setRemoteEmail(emailId);
  };
  useEffect(() => {
    socket.on('new-user-joined', handleNewUserJoinedRoom);
    socket.on('incoming-call', handleIncomingCall);
    socket.on('call-accepted', handleCallAccepted);
    return () => {
      socket.off('new-user-joined', handleNewUserJoinedRoom);
      socket.off('incoming-call', handleIncomingCall);
      socket.off('call-accepted', handleCallAccepted);
    };
  }, [socket]);

  const handleNegotiated = () => {
    const localOffer = peer.localDescription;
    socket.emit('call-user', { emailId: remoteEmail, offer: localOffer });
  };
  useEffect(() => {
    peer.addEventListener('negotiationneeded', handleNegotiated);
    return () => {
      peer.removeEventListener('negotiationneeded', handleNegotiated);
    };
  }, []);

  const handleIncomingCall = async (data: any) => {
    const { from, offer } = data;
    console.log('incoming call from', from, offer);
    const ans = await createAnswer(offer);
    socket.emit('call-accepted', { emailId: from, ans });
    setRemoteEmail(from);
  };
  const handleCallAccepted = async (data: any) => {
    const { ans } = data;
    console.log('Call got accepted', ans);
    await setRemoteAnswer(ans);
  };
  const handleBackIcon = () => {
    navigate('/');
  };
  const getUserMediaStream = async () => {
    const stream: any = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  };
  useEffect(() => {
    getUserMediaStream();
  }, []);
  const handleSendStream = () => {
    sendStream(myStream);
  };
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <ArrowLeftOutlined style={{ fontSize: 28 }} onClick={handleBackIcon} />
        <p style={{ fontSize: 18 }}>Back to Home Screen</p>
        <button onClick={handleSendStream}>send</button>
        <h1>Connected to remote Email {remoteEmail}</h1>
        {/* icons */}
      </div>
      {isCameraOn && (
        <ReactPlayer
          //@ts-ignore
          url={myStream}
          playing={true}
          muted={isMicOn ? true : false}
        />
      )}
      {/* <ReactPlayer
        //@ts-ignore
        url={remoteStream}
        playing={true}
        muted
      /> */}
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          textAlign: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          marginBottom: 100,
        }}
      >
        <p>Hamid Ashraf</p>
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 50,
        }}
      >
        <p>{date.toLocaleTimeString()}</p>
        <ManagementScreen />
        <DetailScreen />
      </div>
    </div>
  );
};

export default MeetingScreen;
