import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Button({ background, onClick, children }) {
  return (
    <Container background={background} onClick={onClick}>
      {children}
    </Container>
  );
}

Button.propTypes = {
  teste: PropTypes.string,
  onClick: PropTypes.func,
  background: PropTypes.string,
  children: PropTypes.any
};

export default Button;
