import React from 'react';
import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import googleMeet from '../../images/google_meet.png';
import AppIcon from '../../images/al-icon.png';

const Header = () => {
  const date = new Date();
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  console.log(date);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Image src={googleMeet} alt="googleMeetLogo" preview={false} />
        <p style={{ fontSize: 32, color: '#5F6368' }}>Meet</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          gap: 10,
          fontSize: 22,
          color: '#5F6368',
        }}
      >
        <p>{date.toLocaleTimeString()}</p>
        <p>{daysOfWeek[date.getDay()]},</p>
        <p>{monthNames[date.getMonth()]}</p>
        <p>{date.getDate()}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <QuestionCircleOutlined />
          <SettingOutlined />
          <div
            style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }}
          >
            <Image src={AppIcon} preview={false} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image src={AppIcon} alt="profilePic" preview={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
