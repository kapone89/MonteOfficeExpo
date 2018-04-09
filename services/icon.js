import { Platform } from 'react-native';

const prefix = Platform.OS === 'ios' ? 'ios-' : 'md-';

export default function icon(name) {
  return prefix + name;
}
