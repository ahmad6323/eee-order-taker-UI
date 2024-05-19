import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import AppErrorMessage from "./AppErrorMessage";

function AppFormFieldCustom({ name, width, value, onChangeText, ...otherProps }) {
  const { touched, setFieldTouched, errors } = useFormikContext();

  const handleChangeText = (text) => {
    onChangeText(text);
  };

  return (
    <>
      <AppTextInput
        width={width}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChangeText}
        value={value}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormFieldCustom;
