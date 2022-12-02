import Button from 'components/Button/Button';
import styled from 'styled-components';

export const BackButtonStyle = styled(Button).attrs((props) => ({
  background: props.background,
  className: props.classname
}))`
  position: relative;
  top: 2%;
  right: 43%;
`;
