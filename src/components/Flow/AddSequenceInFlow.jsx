import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight';

import { SequenceContainer, ButtonStyle } from './styles';
import Button from 'components/Button/Button';
function AddSequenceInFlow({ options, stages, addSequence, removeSequence }) {
  const [originStage, setOriginStage] = useState('');
  const [destinationStage, setDestinationStage] = useState('');

  console.log('options = ', options);

  const stagesInFlow = options.map((option) => {
    const { name: label, idStage: value } = stages.find(
      (stage) => stage.idStage === option
    );
    return { label, value };
  });

  return (
    <SequenceContainer>
      <ButtonStyle>
        <Dropdown
          className="dropdown"
          options={stagesInFlow}
          onChange={(e) => setOriginStage(e)}
          value={originStage}
          placeholder="Selecione a etapa"
        />
      </ButtonStyle>
      <ArrowRight size={25} />
      <ButtonStyle>
        <Dropdown
          className="dropdown"
          options={stagesInFlow}
          onChange={(e) => setDestinationStage(e)}
          value={destinationStage}
          placeholder="Selecione a etapa"
        />
      </ButtonStyle>
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
