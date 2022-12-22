import React, {FC, memo} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {COLORS} from '~styles';

interface Props {
  show: boolean;
  mode: 'date' | 'time';
  onChange: (value: any) => void;
  onCancel: () => void;
  value?: Date | null;
}

const DateTimePicker: FC<Props> = ({show, mode, onChange, value, onCancel}) => {
  const date = value ? value : new Date();

  return (
    <DateTimePickerModal
      isVisible={show}
      mode={mode}
      is24Hour={false}
      onConfirm={onChange}
      onCancel={onCancel}
      isDarkModeEnabled
      textColor={COLORS.Primary_Input}
      backdropStyleIOS={{backgroundColor: COLORS.Secondary_Modal}}
      buttonTextColorIOS={COLORS.Primary_Button[0]}
      pickerContainerStyleIOS={{backgroundColor: COLORS.Primary_Card}}
      date={date}
    />
  );
};

export default memo(DateTimePicker);
