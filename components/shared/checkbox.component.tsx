import { useField, useFormikContext } from 'formik';
import React from 'react';

interface CheckboxData {
  label: string;
  name: string;
  disabled?: boolean;
}

const Checkbox = ({ label, ...props }: CheckboxData) => {
  const [field] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <div className="flex justify-between">
      <label htmlFor="toGroup" className="text-gray-700 mr-4">
        {label}
      </label>
      <input
        {...props}
        // disabled={props.disabled}
        id="toGroup"
        className="form-checkbox h-5 w-5 text-blue-600"
        checked={field.value}
        value={field.value}
        onChange={() => setFieldValue(field.name, !field.value)}
        type="checkbox"
      />
    </div>
  );
};

export default Checkbox;
