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
  onSelectItem
}) {
  const { touched, setFieldValue, values, errors } = useFormikContext();

  const handleSelectItem = (item) => {
    setFieldValue(name, item);
    if (onSelectItem) {
      onSelectItem(item); 
    }
  };

  return (
    <>
      <AppPicker
        icon={"format-list-bulleted-type"}
        width={width}
        items={items}
        placeholder={placeholder}
        numColumns={numColumns}
        PickerItemComponent={PickerItemComponent}
        onSelectedItem={handleSelectItem}
        selectedItem={values[name]}
      ></AppPicker>
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
