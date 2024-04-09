import {
  AudioMutedOutlined,
  AudioOutlined,
  SmileOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import mutedVideo from './mutedVideo.png';
import { Popover, message } from 'antd';
import EmojiPicker from 'emoji-picker-react';
import { ImPhoneHangUp } from 'react-icons/im';
import { BiCaptions } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegHandPaper } from 'react-icons/fa';
import { LuScreenShare } from "react-icons/lu";
import { LuVideoOff } from "react-icons/lu";


const ManagementScreen = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [screenStream,setScreenStream]=useState()

  const handleScreenShare= async()=>{
    try {
      const screenStream :any =await navigator.mediaDevices.getUserMedia({ video:true} )
      console.log(screenStream)
      setScreenStream(screenStream);
    } catch (error) {
      console.log('Error while sharing screen',error);
    }

  }
  return (
    <div>
      <div style={{ display: 'flex', gap: 30, alignItems: 'center'}}>
        {isMicOn ? (
          <AudioMutedOutlined
          // onClick={(e) => setIsMicOn(false)}
          size={24}
          />
        ) : (
          <AudioOutlined
          // onClick={(e) => setIsMicOn(true)}
          size={24}
          />
        )}
        {isCameraOn ? (
          <VideoCameraOutlined
          // onClick={(e) => setIsCameraOn(false)}
          size={24}
          />
        ) : (
            <LuVideoOff size={24} />
        )}
        <BiCaptions size={24} />
        <Popover
          content={
            <div>
              <EmojiPicker />
            </div>
          }
          title="Title"
          trigger={'click'}
        >
          <SmileOutlined size={32} />
        </Popover>
        <LuScreenShare size={22} onClick={handleScreenShare} />
        <FaRegHandPaper size={22} />
        <BsThreeDotsVertical size={22} />
        <ImPhoneHangUp size={22} />
        <video src={screenStream} autoPlay={true} />
      </div>
    </div>
  );
};

export default ManagementScreen;
