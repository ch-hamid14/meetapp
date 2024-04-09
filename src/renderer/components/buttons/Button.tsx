import React from 'react';
import { Button as RButton } from 'antd';
const Button = ({ children, type, size, icon, style, onClick }: any) => {
  return (
    <div>
      <RButton
        type={type}
        size={size}
        icon={icon}
        style={style}
        onClick={onClick}
      >
        {children}
      </RButton>
    </div>
  );
};

export default Button;
