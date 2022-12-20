import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {StackParamList} from 'types';

export const navigationRef = createNavigationContainerRef<StackParamList>();

export function navigate(name: string, params?: undefined) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function reset(name: string, params?: undefined) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({index: 1, routes: [{name, params}]}),
    );
  }
}
