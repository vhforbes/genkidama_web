import React from 'react';
import { useField } from 'formik';

interface InputData {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

const MyTextInput = ({ label, ...props }: InputData) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input className="input input-bordered" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red">{meta.error}</div>
      ) : null}
    </>
  );
};

export default MyTextInput;
