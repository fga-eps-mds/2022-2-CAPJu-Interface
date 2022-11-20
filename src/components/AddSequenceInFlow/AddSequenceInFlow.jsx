import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';

function AddSequenceInFlow(props) {
  const { value, setValue, options } = props;
  return (
    <Dropdown
      options={options}
      onChange={(e) => {
        setValue(e.value);
      }}
      value={value}
      placeholder="Selecione a etapa"
      className="dropdown"
      controlClassName="dropdown-control"
      placeholderClassName="dropdown-placeholder"
      menuClassName="dropdown-menu"
      arrowClassName="dropdown-arrow"
    />
  );
}

AddSequenceInFlow.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array,
  setValue: PropTypes.func
};

export default AddSequenceInFlow;
