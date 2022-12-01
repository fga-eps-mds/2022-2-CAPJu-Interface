import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';

import { SelectorWrapper } from './styles.js';
import ButtonAdd from 'components/ButtonAdd/ButtonAdd';

function AddStageInFlow(props) {
  const { selectedStage, options, onClick, setSelectedStage, flow } = props;
  return (
    <SelectorWrapper>
      <Dropdown
        options={options}
        onChange={(e) => {
          setSelectedStage(e.value);
        }}
        value={selectedStage}
        placeholder="Selecione a etapa"
        className="dropdown"
        controlClassName="dropdown-control"
        placeholderClassName="dropdown-placeholder"
        menuClassName="dropdown-menu"
        arrowClassName="dropdown-arrow"
      />
      <ButtonAdd onClickProps={() => onClick(flow)} />
    </SelectorWrapper>
  );
}

AddStageInFlow.propTypes = {
  selectedStage: PropTypes.any,
  onClick: PropTypes.func,
  options: PropTypes.array,
  setSelectedStage: PropTypes.func,
  flow: PropTypes.object
};

export default AddStageInFlow;
