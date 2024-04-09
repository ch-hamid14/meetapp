import React, { useMemo,useEffect, useState } from 'react';

const PeerContext = React.createContext(null);
export const usePeer = () => React.useContext(PeerContext);
export const PeerProvider = (props: any) => {
  const [remoteStream,setRemoteStream]=useState(null)
  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              'stun:stun.l.google.com:19302',
              'stun:global.stun.twilio.com:3478',
            ],
          },
        ],
      }),
    [],
  );

  const createOffer = async () => {
    const offer: any = peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };
  const createAnswer = async (offer: any) => {
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };
  const setRemoteAnswer = async (ans: any) => {
    await peer.setRemoteDescription(ans);
  };
  const sendStream = async (stream: any) => {
    const tracks = stream.getTracks();
    for (const track of tracks) {
      peer.addTrack(track, stream);
    }
  };
  const handleTrackStream=(event:any)=>{
    const streams=event.streams
    setRemoteStream(streams[0])
}

  useEffect(()=>{
    peer.addEventListener('track',handleTrackStream)
    return ()=>{
      peer.removeEventListener('track',handleTrackStream)
    }
  },[peer])
  return (
    <PeerContext.Provider
    //@ts-ignore
      value={{ peer, createOffer, createAnswer, setRemoteAnswer,sendStream,remoteStream }}
    >
      {props.children}
    </PeerContext.Provider>
  );
};
