import { useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import { Platform } from 'react-native';

export default function Page() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return; // 🛑 Root layout not ready yet

    if (Platform.OS === 'ios') {
      router.replace('/screenshare');
    } else if (Platform.OS === 'android') {
      router.replace('/receiver');
    }
  }, [rootNavigationState]);

  return null; // Optional: show a small loading spinner if you want
}
