import React, {FC, memo} from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  show: boolean;
  mode: 'date' | 'time';
  onChange: (event: any, value: any) => void;
  value?: Date | null;
}

const DateTimePicker: FC<Props> = ({show, mode, onChange, value}) => {
  const date = value ? value : new Date();

  if (show) {
    return (
      <RNDateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode as any}
        is24Hour={false}
        onChange={onChange}
      />
    );
  }

  return null;
};

export default memo(DateTimePicker);
