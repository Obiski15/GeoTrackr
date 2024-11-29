import PropTypes from "prop-types";
import { useState } from "react";

import FormCheckbox from "./FormCheckbox";
import FileInput from "./FileInput";

function ImageUpload({ onChange, register, label }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <FormCheckbox
        checked={isChecked}
        label={label}
        onChange={() => setIsChecked((checked) => !checked)}
        onClick={() => setIsChecked((checked) => !checked)}
      />
      {isChecked && (
        <FileInput
          name="updated-photo"
          onChange={onChange}
          register={register}
        />
      )}
    </>
  );
}

ImageUpload.propTypes = {
  register: PropTypes.object,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

export default ImageUpload;
