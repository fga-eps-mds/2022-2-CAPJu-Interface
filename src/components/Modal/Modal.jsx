import React from 'react';
import PropTypes from 'prop-types';

import { ModalStyle, Content, ContentHeader } from './styles.js';

function Modal({ title, children }) {
  return (
    <ModalStyle>
      <Content>
        <ContentHeader>
          <span>{title}</span>
        </ContentHeader>
        {children}
      </Content>
    </ModalStyle>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
};

export default Modal;
