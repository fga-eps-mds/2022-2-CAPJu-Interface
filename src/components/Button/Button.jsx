import React from 'react';
import PropTypes from 'prop-types';

import { Container, ButtonEdge, BtnStyle } from './styles';

function Button({ background, onClick, children, className }) {
  if (className === 'edge') {
    return (
      <>
        <ButtonEdge onClick={onClick}>{children}</ButtonEdge>
      </>
    );
  }
  if (className === 'showProcess') {
    return (
      <>
        <BtnStyle onClick={onClick}>{children}</BtnStyle>
      </>
    );
  } else {
    return (
      <>
        <Container
          background={background}
          onClick={onClick}
          className={className}
        >
          {children}
        </Container>
      </>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  teste: PropTypes.string,
  onClick: PropTypes.func,
  background: PropTypes.string,
  children: PropTypes.any
};

export default Button;
