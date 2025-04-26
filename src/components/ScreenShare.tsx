import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { mediaDevices, RTCPeerConnection, RTCView } from 'react-native-webrtc';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001'; // Change this
const socket = io(SERVER_URL);

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export default function ScreenShare() {
  const pc = useRef<RTCPeerConnection | null>(null);
  const stream = useRef<any>(null);

  useEffect(() => {
    const start = async () => {
      const s = await mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      stream.current = s;

      pc.current = new RTCPeerConnection(configuration);

      s.getTracks().forEach((track) => {
        pc.current?.addTrack(track, s);
      });

      const offer = await pc.current.createOffer({}); // ✅ Pass empty object
      await pc.current.setLocalDescription(offer);

      socket.emit('offer', { sdp: offer });

      (pc.current as any).onicecandidate = (event: any) => {
        // ✅ Cast as any
        if (event.candidate) {
          socket.emit('ice-candidate', { candidate: event.candidate });
        }
      };
    };

    start();

    socket.on('answer', async ({ sdp }) => {
      if (pc.current) {
        await pc.current.setRemoteDescription(sdp);
      }
    });

    socket.on('ice-candidate', async ({ candidate }) => {
      if (candidate && pc.current) {
        await pc.current.addIceCandidate(candidate);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {stream.current && (
        <RTCView
          streamURL={(stream.current as any).toURL()} // ✅ Cast stream to any
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
