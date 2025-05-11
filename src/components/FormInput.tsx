import React from 'react';
import AppInput, {AppInputProps} from './AppInput.tsx';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';

export type FormInputProps<ControlType extends FieldValues> = {
  control: Control<ControlType>;
  name: Path<ControlType>;
} & AppInputProps;
const FormInput = <A extends FieldValues = any>({
  control,
  name,
  title,
  titleType = 'outside',
  placeholder,
  keyboardType = 'default',
  ...rest
}: FormInputProps<A>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}}) => (
        <AppInput
          {...rest}
          title={title}
          titleType={titleType}
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={value.toString()}
          onChangeText={text => onChange(Number(text))}
          onBlur={onBlur}
        />
      )}
    />
  );
};

export default FormInput;
