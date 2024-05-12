import React from "react";
import ImageInputList from "../ImageInputList";
import AppErrorMessage from "./AppErrorMessage";
import { useFormikContext } from "formik";

function AppFormImagePicker({ name }) {
  const { touched, setFieldValue, values, errors } = useFormikContext();

  const imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };
  
  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormImagePicker;
