import React, { useEffect, useRef, useState } from 'react';
import { Header } from '../header';
import { PictureView } from '../pictureModal';
import { Footer } from '../footer';
import { Button, Divider, Input } from '../../components';
import { VideoCameraAddOutlined } from '@ant-design/icons';
import { useSocket } from '../../providers/Socket';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [email, setEmail] = useState('');
  const { socket }: any = useSocket();
  const handleJoinRoom = () => {
    socket.emit('join-room',{emailId:email,roomId});
  };
  const navigate = useNavigate();
  useEffect(() => {
    socket.on('joined-room', handleRoomJoined);
    return ()=>{
      socket.off('joined-room',handleRoomJoined)
    }
  }, [socket]);
  const handleRoomJoined = ({roomId}:any) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <>
      <div>
        <Header />
        <div>
          <p style={{ fontSize: 48, color: '#212121' }}>
            Video calls and meetings for everyone
          </p>
          <p style={{ fontSize: 26, color: '#5F6368' }}>
            Google meet provides secure, easy-to-use video calls and meetings
            for everyone, on any device
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 15,
              marginTop: 50,
            }}
          >
            <Button
              type="primary"
              size="large"
              icon={<VideoCameraAddOutlined />}
              style={{ borderRadius: 4 }}
            >
              New Meeting
            </Button>
            <Input
              placeholder="Email"
              size="large"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Enter a code or link"
              size="large"
              value={roomId}
              onChange={(e: any) => setRoomId(e.target.value)}
            />
            <Button
              prefix={<VideoCameraAddOutlined />}
              style={{
                border: 'none',
                background: 'none',
                boxShadow: 'none',
                fontSize: 18,
                color: '#5F6368',
              }}
              onClick={handleJoinRoom}
            >
              Join
            </Button>
          </div>
          <div style={{ width: 400, height: 200, marginRight: 90 }}>
            <PictureView />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 100 }}>
        <Divider />
      </div>
      <Footer />
    </>
  );
};

export default Home;
