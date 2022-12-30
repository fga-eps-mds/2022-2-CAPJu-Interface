import React from 'react';
import PropTypes from 'prop-types';

import { Container, ButtonEdge, BtnStyle, ButtonAdd } from './styles';

function Button({ background, onClick, children, buttonType }) {
  let ButtonComponent;

  if (buttonType === 'edge') {
    ButtonComponent = ButtonEdge;
  } else if (buttonType === 'add') {
    ButtonComponent = ButtonAdd;
  } else if (buttonType === 'showProcess') {
    ButtonComponent = BtnStyle;
  } else {
    ButtonComponent = Container;
  }

  return (
    <ButtonComponent background={background} onClick={onClick}>
      {children}
    </ButtonComponent>
  );
}

Button.propTypes = {
  buttonType: PropTypes.string,
  teste: PropTypes.string,
  onClick: PropTypes.func,
  background: PropTypes.string,
  children: PropTypes.any
};

export default Button;
