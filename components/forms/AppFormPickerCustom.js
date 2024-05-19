import { useFormikContext } from "formik";
import React from "react";

import AppPicker from "../AppPicker";
import AppErrorMessage from "./AppErrorMessage";

function AppFormPickerCustom({
  items,
  name,
  placeholder,
  width,
  PickerItemComponent,
  numColumns,
  onSelectItem,
  value
}) {
  const { touched, errors } = useFormikContext();

  const handleSelectItem = (item) => {
    onSelectItem(item); 
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
        selectedItem={value !== undefined ? value : placeholder}
      ></AppPicker>
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPickerCustom;
