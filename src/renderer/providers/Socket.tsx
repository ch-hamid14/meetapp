import React, { useMemo } from 'react';
import { io } from 'socket.io-client';
const SocketContext = React.createContext(null);

export const useSocket = () => {
  return React.useContext(SocketContext);
};

export const SocketProvider = (props: any) => {
  const socket = useMemo(() => io('http://localhost:8081'), []);
  return (
    //@ts-ignore
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};
