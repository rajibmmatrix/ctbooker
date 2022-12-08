import Toast from 'react-native-simple-toast';
import config from '~config';

export function log(message: any) {
  if (config.mode === 'Development') {
    console.log(JSON.stringify(message));
  }
}

type Type = 'error' | 'success' | 'warning';

export function showToaster(message: string, type?: Type) {
  log(type);
  Toast.show(message);
}
