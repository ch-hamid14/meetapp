import React, { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { MdOutlineChat } from 'react-icons/md';
import { MdOutlineLockPerson } from 'react-icons/md';
import { Drawer, Input, Modal } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const DetailScreen = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', gap: 30, alignItems: 'center', margin: 10 }}>
      <MdErrorOutline />
      <FaUserFriends />
      <MdOutlineChat onClick={showDrawer} />
      <MdOutlineLockPerson />
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <p>Some Message of me</p>
        <p style={{ textAlign: 'right' }}>Some contents other</p>
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            marginBottom: 40,
            marginLeft:40
          }}
        >
            <Input style={{ width: 250 }} suffix={<SendOutlined />} size='large' placeholder='send your message' />
        </div>
      </Drawer>
    </div>
  );
};

export default DetailScreen;
