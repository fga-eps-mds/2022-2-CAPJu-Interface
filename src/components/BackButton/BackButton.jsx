const React = require('react');
const { useNavigate } = require('react-router-dom');

const { BackButtonStyle } = require('./styles');

function BackButton() {
  const navigate = useNavigate();
  return (
    <BackButtonStyle onClick={() => navigate(-1)}>
      <span>Voltar</span>
    </BackButtonStyle>
  );
}

export default BackButton;
