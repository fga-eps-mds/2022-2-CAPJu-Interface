import React from 'react';
import PropTypes from 'prop-types';

import { Input } from './styles';

function TextInput({ placeholder, value, type, maxLength, set }) {
  function handleUpdateElem(event) {
    set(event.target.value);
  }

  return (
    <Input
      placeholder={placeholder}
      onChange={handleUpdateElem}
      value={value}
      type={type}
      maxLength={maxLength}
    />
  );
}

TextInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  set: PropTypes.func,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  label: PropTypes.string
};

export default TextInput;
