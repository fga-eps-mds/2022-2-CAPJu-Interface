import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles.js';

function ModalBody(props) {
  return <Container>{props.children}</Container>;
}

ModalBody.propTypes = {
  children: PropTypes.any
};

export default ModalBody;
