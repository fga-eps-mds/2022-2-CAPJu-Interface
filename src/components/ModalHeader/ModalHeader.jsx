import React from 'react';
import PropTypes from 'prop-types';

import { Container, Xbutton, Title } from './styles.js';

function ModalHeader(props) {
  return (
    <Container className="modal-header">
      <Title id="modal-title">{props.children}</Title>
      <Xbutton onClick={props.close}>x</Xbutton>
    </Container>
  );
}

ModalHeader.propTypes = {
  children: PropTypes.string,
  close: PropTypes.func
};

export default ModalHeader;
