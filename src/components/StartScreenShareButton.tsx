import { Button, View, Alert } from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';

export default function StartScreenShareButton() {
  const startCapture = async () => {
    try {
      const result = await ScreenCapture.startAsync();
      console.log('Screen sharing started', result);
    } catch (error) {
      console.error('Failed to start screen sharing', error);
      Alert.alert('Error', 'Unable to start screen sharing.');
    }
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <Button title="Start Screen Sharing" onPress={startCapture} />
    </View>
  );
}
