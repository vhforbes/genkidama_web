import React from 'react';
import { useField, useFormikContext } from 'formik';
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input-field';

interface InputData {
  label: string;
  name: string;
  mask?: string;
  currency?: boolean;
  type: string;
  placeholder: string;
}

const MyTextInput = ({ label, mask, currency, ...props }: InputData) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  const inputType = () => {
    if (mask) {
      return (
        <InputMask
          className="input input-bordered"
          mask={mask}
          maskChar=" "
          {...field}
          {...props}
        />
      );
    }

    if (currency) {
      return (
        <CurrencyInput
          className="input input-bordered"
          prefix="R$ "
          id="input-example"
          decimalsLimit={4}
          decimalSeparator=","
          groupSeparator="."
          onValueChange={value => setFieldValue(field.name, value)}
          {...props}
        />
      );
    }

    return <input className="input input-bordered" {...field} {...props} />;
  };

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      {inputType()}
      {/* {mask ? (
        <InputMask
          className="input input-bordered"
          mask={mask}
          maskChar=" "
          {...field}
          {...props}
        />
      ) : (
        <input className="input input-bordered" {...field} {...props} />
      )} */}

      {meta.touched && meta.error ? (
        <div className="text-red">{meta.error}</div>
      ) : null}
    </>
  );
};

export default MyTextInput;
