import React from 'react';
import PropTypes from 'prop-types';

import { Container, ButtonEdge, BtnStyle, ButtonAdd } from './styles';

const buttonTypeToComponent = {
  edge: ButtonEdge,
  add: ButtonAdd,
  showProcess: BtnStyle
};

function Button({ background, onClick, children, buttonType, text }) {
  const ButtonComponent = buttonTypeToComponent[buttonType] || Container;
  return (
    <ButtonComponent background={background} onClick={onClick}>
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
  text: PropTypes.string
};

export default Button;
