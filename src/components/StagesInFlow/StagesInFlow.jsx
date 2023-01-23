import React from 'react';
import PropTypes from 'prop-types';

import { StagesWrapper, StageName, XButton } from './styles.js';

function StagesInFlow(props) {
  const { flow, stageList, setNewFlow } = props;

  function removeStage(id) {
    const index = flow.stages.indexOf(id);
    if (index !== -1) {
      flow.stages.splice(index, 1);
    }
    setNewFlow(flow);
  }

  return (
    <StagesWrapper>
      {flow.stages.map((flowStage, index) => {
        return (
          <div key={index}>
            <StageName>
              {
                stageList.find((stage) => {
                  return flowStage == stage.idStage;
                }).name
              }
              <XButton onClick={() => removeStage(flowStage)}> X </XButton>
            </StageName>
          </div>
        );
      })}
    </StagesWrapper>
  );
}

StagesInFlow.propTypes = {
  flow: PropTypes.object,
  stageList: PropTypes.array,
  setNewFlow: PropTypes.func
};

export default StagesInFlow;
