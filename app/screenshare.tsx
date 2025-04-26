import BroadcastPicker from '@/src/components/BroadcastPicker';
import ScreenShare from '@/src/components/ScreenShare'; // your RTCView sending
import { View } from 'react-native';

export default function ScreenSharePage() {
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <BroadcastPicker style={{ width: 60, height: 60 }} />
      <ScreenShare />
    </View>
  );
}
