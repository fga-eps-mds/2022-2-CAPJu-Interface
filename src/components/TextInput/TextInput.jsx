import React from 'react';
import PropTypes from 'prop-types';

import { Input } from './styles';

function TextInput({ label, placeholder, onChange, value, type, maxLength }) {
  function handleUpdateElem(event) {
    onChange(event.target.value);
  }

  return (
    <div>
      <label> {label} </label>
      <Input
        placeholder={placeholder}
        onChange={handleUpdateElem}
        value={value}
        type={type}
        maxLength={maxLength}
      />
    </div>
  );
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  label: PropTypes.string
};

TextInput.defaultProps = {
  placeholder: '',
  type: 'input',
  maxLength: 25,
  label: ''
};

export default TextInput;
