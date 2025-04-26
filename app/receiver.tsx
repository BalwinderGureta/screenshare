import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RTCPeerConnection, RTCView } from 'react-native-webrtc';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001'; // Replace with your server IP
const socket = io(SERVER_URL);

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export default function ReceiveStream() {
  const pc = useRef<RTCPeerConnection | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const start = async () => {
      pc.current = new RTCPeerConnection(configuration);

      (pc.current as any).ontrack = (event: any) => {
        const stream = event.streams[0];
        if (stream) {
          setRemoteStream(stream);
        }
      };

      socket.on('offer', async ({ sdp }) => {
        if (pc.current) {
          await pc.current.setRemoteDescription(sdp);

          const answer = await pc.current.createAnswer({});
          await pc.current.setLocalDescription(answer);

          socket.emit('answer', { sdp: answer });
        }
      });

      socket.on('ice-candidate', async ({ candidate }) => {
        if (candidate && pc.current) {
          await pc.current.addIceCandidate(candidate);
        }
      });

      (pc.current as any).onicecandidate = (event: any) => {
        if (event.candidate) {
          socket.emit('ice-candidate', { candidate: event.candidate });
        }
      };
    };

    start();
  }, []);

  return (
    <View style={styles.container}>
      {remoteStream && (
        <RTCView
          streamURL={(remoteStream as any)?.toURL()} // Cast as any
          style={styles.stream}
          objectFit="cover"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  stream: { width: '100%', height: '100%' },
});
