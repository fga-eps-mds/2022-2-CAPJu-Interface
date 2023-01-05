import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight';

import { Container, SequenceContainer } from './styles';
import Button from 'components/Button/Button';
function AddSequenceInFlow({ options, stages, addSequence, removeSequence }) {
  const [originStage, setOriginStage] = useState('');
  const [destinationStage, setDestinationStage] = useState('');

  const stagesInFlow = options.map((option) => {
    const { name: label, _id: value } = stages.find(
      (stage) => stage._id === option
    );
    return { label, value };
  });

  return (
    <SequenceContainer>
      <text>{'Sequências'}</text>
      <Container>
        <Dropdown
          options={stagesInFlow}
          onChange={(e) => setOriginStage(e.value)}
          value={originStage}
          placeholder="Selecione a etapa"
        />
      </Container>
      <ArrowRight size={25} />
      <Container>
        <Dropdown
          options={stagesInFlow}
          onChange={(e) => setDestinationStage(e.value)}
          value={destinationStage}
          placeholder="Selecione a etapa"
        />
      </Container>
      <Button
        buttonType={'add'}
        onClick={() => addSequence(originStage, destinationStage)}
        text={'Adicionar'}
      />
      <Button background="#de5353" onClick={removeSequence} text={'Remover'} />
    </SequenceContainer>
  );
}

AddSequenceInFlow.propTypes = {
  options: PropTypes.array,
  addSequence: PropTypes.func.isRequired,
  removeSequence: PropTypes.func.isRequired,
  stages: PropTypes.array.isRequired
};

AddSequenceInFlow.defaultProps = {
  options: []
};

export default AddSequenceInFlow;
