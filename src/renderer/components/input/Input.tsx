import React from 'react';
import { Input as RInput } from 'antd';

interface IInput {
  placeholder: string;
  size?: string | any;
  onChange?: any;
  ref?: any;
  value: any;
}
const Input = ({ placeholder, size, onChange, ref, value }: IInput) => {
  return (
    <div>
      <RInput
        placeholder={placeholder}
        size={size}
        onChange={onChange}
        ref={ref}
        value={value}
      />
    </div>
  );
};

export default Input;
