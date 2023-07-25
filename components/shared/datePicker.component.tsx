import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

type DatePickerFieldProps = {
  name: string;
  label: string;
  disabled: boolean;
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  label,
  disabled = false,
}) => {
  const { setFieldValue } = useFormikContext();

  const [field] = useField(name);

  return (
    <div className="flex flex-col ">
      <label htmlFor={field.name}>{label}</label>
      <DatePicker
        disabled={disabled}
        className="input input-bordered"
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          setFieldValue(name, val ? val.toISOString() : null);
        }}
      />
    </div>
  );
};

export default DatePickerField;
