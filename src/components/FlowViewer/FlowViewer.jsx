import React from 'react';
import PropTypes from 'prop-types';
import ReactFlow, { MarkerType } from 'react-flow-renderer';

import { Container } from './styles';
import { isLate, getStageDate } from 'components/IsLate/index.js';
import EdgeButton from './EdgeButton.jsx';

const edgeTypes = {
  edgebutton: EdgeButton
};

function FlowViewer(props) {
  const procStages = props.proc?.etapas;
  const { disabled, newModal } = props;

  function deadlineDate(stage) {
    const stageDate = getStageDate(stage._id, props.proc, props.flow);
    if (stageDate instanceof Date && !isNaN(stageDate)) {
      stageDate.setDate(stageDate.getDate() + parseInt(stage.time));
      return stageDate.toLocaleDateString();
    }
  }
  const nodes = props.stages
    .filter((stage) => {
      return props.flow.stages.includes(stage._id);
    })
    .map((stage, idx) => {
      const deadline = props.proc ? deadlineDate(stage) : null;
      return {
        id: stage._id,
        data: {
          label: (
            <>
              {stage.name} <br /> {deadline ? `Vencimento: ${deadline}` : ``}
            </>
          )
        },
        position: { x: (idx % 2) * 130, y: 140 * idx },
        style:
          props.highlight === stage._id
            ? {
                backgroundColor: isLate(stage, props.proc, props.flow)
                  ? 'rgb(222, 83, 83)'
                  : '#1b9454',
                color: '#f1f1f1'
              }
            : {}
      };
    });

  let edges;
  edges = procStages.map((sequence) => {
    return {
      id: 'e' + sequence.stageIdFrom + '-' + sequence.stageIdTo,
      source: sequence.stageIdFrom,
      target: sequence.stageIdTo,
      label:
        sequence.observation || (!disabled && '+ Adicionar nova notificação'),
      type: sequence.observation.length == 0 && !disabled ? 'edgebutton' : '',
      animated: true,
      data: { onClick: newModal },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#2a2a32'
      },
      style: { stroke: '#1b9454' }
    };
  });

  edges = [
    ...edges,
    ...props.flow.sequences.map((sequence) => {
      const id = 'e' + sequence.from + '-' + sequence.to;
      return {
        id: id,
        source: sequence.from,
        target: sequence.to,
        label: !disabled && '+ Adicionar nova notificação',
        type: !disabled && 'edgebutton',
        animated: true,
        data: { onClick: newModal },
        style: { stroke: 'black' }
      };
    })
  ];

  const uniqueEdges = edges.filter((edgeS) => {
    if (
      edges.some((edgeI) => edgeS.id == edgeI.id && edgeS.label !== edgeI.label)
    ) {
      if (edgeS.label !== '+ Adicionar nova notificação') return edgeS;
    } else return edgeS;
  });

  return (
    uniqueEdges && (
      <Container onClick={props.onClick}>
        <ReactFlow
          nodes={nodes}
          edges={uniqueEdges}
          edgeTypes={edgeTypes}
          fitView
        />
      </Container>
    )
  );
}

FlowViewer.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  flow: PropTypes.any,
  stages: PropTypes.array,
  highlight: PropTypes.string,
  proc: PropTypes.object,
  newModal: PropTypes.func
};

FlowViewer.defaultProps = {
  disabled: false,
  newModal: null
};

export default FlowViewer;
