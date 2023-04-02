import { Button } from 'antd';
import { DatePicker } from 'antd-mobile';
import { Precision } from 'antd-mobile/es/components/date-picker/date-picker-utils';
import { useState } from 'react';
import { getDateByFormat, isDate } from 'utils/date';

export interface FormProps {
  value?: any;
  onChange?: any;
  precision: Precision
  format: string
  showFuture?: boolean
}

const MobileDatePicker = ({ value = {}, onChange, precision, format, showFuture } : FormProps) => {
  const [ visible, setVisible ] = useState(false);

  const maxDate = !showFuture ? new Date() : new Date(`12-31-${new Date().getFullYear() + 1}`);
  const minDate = new Date('01-01-1910');

  const getDateString = () => {
    return value && isDate(value)? `Valitud kuupäev: ${getDateByFormat(value, format)}` : 'Vali kuupäev';
  };

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
        style={{ width: '100%' }}
      >
        {getDateString()}
      </Button>
      <DatePicker
        visible={visible}
        onClose={() => {setVisible(false);}}
        confirmText={'Ok'}
        cancelText={'Loobu'}
        precision={precision}
        value={isDate(value) ? value : undefined}
        onConfirm={onChange}
        min={minDate}
        max={maxDate}
        defaultValue={new Date()}
      />
    </>
  );
};

export default MobileDatePicker;