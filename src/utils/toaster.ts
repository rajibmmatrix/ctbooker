import Toast from 'react-native-simple-toast';

type Type = 'error' | 'success' | 'warning';

export function showToaster(message: string, type: Type) {
  console.log(type);
  Toast.show(message);
}
