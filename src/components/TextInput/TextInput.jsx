import React from 'react';
import PropTypes from 'prop-types';

import { Input } from './styles';

function TextInput(props) {
  function handleUpdateElem(event) {
    props.set(event.target.value);
  }

  return (
    <div>
      <label> {props.label} </label>
      <Input
        placeholder={props.placeholder}
        onChange={handleUpdateElem}
        value={props.value}
        type={props.type}
        maxLength={props.maxLength}
      />
    </div>
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
