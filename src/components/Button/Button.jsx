import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Button({ background, onClick, children, className }) {
  return (
    <Container background={background} onClick={onClick} className={className}>
      {children}
    </Container>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  teste: PropTypes.string,
  onClick: PropTypes.func,
  background: PropTypes.string,
  children: PropTypes.any
};

export default Button;
