import React from 'react';
import PropTypes from 'prop-types';
import ReactFlow, { MarkerType } from 'react-flow-renderer';

import { FlowContainer } from './styles';
import { isLate, getStageDate } from 'components/IsLate/index.js';
import EdgeButton from './EdgeButton.jsx';

const edgeTypes = {
  edgebutton: EdgeButton
};

function FlowViewer(props) {
  const { flow, disabled, openModal } = props;

  function deadlineDate(stage) {
    const stageDate = getStageDate(stage.idStage, props.proc, flow);
    if (stageDate instanceof Date && !isNaN(stageDate)) {
      stageDate.setDate(stageDate.getDate() + stage.duration);
      return stageDate.toLocaleDateString();
    }
  }
  const nodes = props.stages
    .filter((stage) => {
      return props.flow.stages.includes(stage.idStage);
    })
    .map((stage, idx) => {
      const deadline = props.proc ? deadlineDate(stage) : null;
      return {
        id: `${stage.idStage}`,
        data: {
          label: `${stage.name}\n${deadline && `Vencimento: ${deadline}`}`
        },
        position: { x: (idx % 2) * 130, y: 140 * idx },
        style: props.highlight === stage.idStage && {
          backgroundColor: isLate(stage, props.proc, props.flow)
            ? 'rgb(222, 83, 83)'
            : '#1b9454',
          color: '#f1f1f1'
        }
      };
    });

  let edges;
  if (flow) {
    edges = flow.sequences.map((sequence) => {
      return {
        id: 'e' + sequence.from + '-' + sequence.to,
        source: `${sequence.from}`,
        target: `${sequence.to}`,
        label:
          sequence.commentary || (!disabled && '+ Adicionar nova notificação'),
        type: !disabled && 'edgebutton',
        animated: true,
        data: { onClick: openModal },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#2a2a32'
        },
        style: { stroke: '#1b9454' }
      };
    });
  } else {
    edges = props.flow.sequences.map((sequence) => {
      const id = 'e' + sequence.from + '-' + sequence.to;
      return {
        id: id,
        source: `${sequence.from}`,
        target: `${sequence.to}`,
        label: !disabled && '+ Adicionar nova notificação',
        type: !disabled && 'edgebutton',
        animated: true,
        data: { onClick: openModal },
        style: { stroke: 'black' }
      };
    });
  }

  return (
    edges && (
      <FlowContainer onClick={props.onClick}>
        <ReactFlow nodes={nodes} edges={edges} edgeTypes={edgeTypes} fitView />
      </FlowContainer>
    )
  );
}

FlowViewer.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  flow: PropTypes.any,
  stages: PropTypes.array,
  highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  proc: PropTypes.object,
  openModal: PropTypes.func
};

FlowViewer.defaultProps = {
  disabled: false,
  onClick: null,
  flow: null,
  stages: [],
  highlight: null,
  proc: null,
  openModal: null
};

export default FlowViewer;
