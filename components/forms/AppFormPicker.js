import { useFormikContext } from "formik";
import React from "react";

import AppPicker from "../AppPicker";
import AppErrorMessage from "./AppErrorMessage";

function AppFormPicker({
  items,
  name,
  placeholder,
  width,
  PickerItemComponent,
  numColumns,
}) {
  const { touched, setFieldValue, values, errors } = useFormikContext();

  return (
    <>
      <AppPicker
        icon={"format-list-bulleted-type"}
        width={width}
        items={items}
        placeholder={placeholder}
        numColumns={numColumns}
        PickerItemComponent={PickerItemComponent}
        onSelectedItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
      ></AppPicker>
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
