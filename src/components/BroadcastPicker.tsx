import { requireNativeViewManager } from 'expo-modules-core';
import { ViewStyle } from 'react-native';

const BroadcastPicker = requireNativeViewManager('BroadcastPickerManager') as React.ComponentType<{
  style?: ViewStyle;
}>;

export default BroadcastPicker;
