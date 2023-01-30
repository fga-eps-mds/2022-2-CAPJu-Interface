import React from 'react';
import PropTypes from 'prop-types';

import { Container, ButtonEdge, BtnStyle, ButtonAdd } from './styles';

const buttonTypeToComponent = {
  edge: ButtonEdge,
  add: ButtonAdd,
  showProcess: BtnStyle
};

function Button({ background, onClick, children, buttonType, text, disabled }) {
  const ButtonComponent = buttonTypeToComponent[buttonType] || Container;
  return (
    <ButtonComponent
      background={background}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {children}
    </ButtonComponent>
  );
}

Button.propTypes = {
  buttonType: PropTypes.string,
  teste: PropTypes.string,
  onClick: PropTypes.func,
  background: PropTypes.string,
  children: PropTypes.any,
  text: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;
