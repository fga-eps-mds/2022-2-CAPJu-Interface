import React from 'react';
import PropTypes from 'prop-types';

import { ButtonAddStyle } from './styles.js';

function ButtonAdd({ onClickProps }) {
  return (
    <ButtonAddStyle>
      <button onClick={onClickProps} className="add-button-flow">
        Adicionar
      </button>
    </ButtonAddStyle>
  );
}

ButtonAdd.propTypes = {
  onClickProps: PropTypes.func
};

export default ButtonAdd;
