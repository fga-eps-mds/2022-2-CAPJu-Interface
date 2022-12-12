import React from 'react';
import PropTypes from 'prop-types';
import { getBezierPath, getBezierEdgeCenter } from 'react-flow-renderer';
import { AnnotationEdgeButton, ForeignObject } from './styles';

export default function EdgeButton({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
  sourcePosition,
  targetPosition,
  style = {},
  label,
  data,
  markerEnd
}) {
  const { onClick } = data;
  const foreignObjectWidth = 150;
  const foreignObjectHeight = 25;
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  const [centerX, centerY] = getBezierEdgeCenter({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />

      <ForeignObject
        width={foreignObjectWidth}
        height={foreignObjectHeight}
        x={centerX - foreignObjectWidth / 2}
        y={centerY - foreignObjectHeight / 2}
        requiredExtensions="http://www.w3.org/1999/xhtml"
        onClick={() => onClick(source, target)}
      >
        <AnnotationEdgeButton className="edgebutton-foreignobject">
          <button className="edge-button">{label}</button>
        </AnnotationEdgeButton>
      </ForeignObject>
    </>
  );
}

EdgeButton.propTypes = {
  id: PropTypes.string.isRequired,
  sourceX: PropTypes.number.isRequired,
  sourceY: PropTypes.number.isRequired,
  targetX: PropTypes.number.isRequired,
  targetY: PropTypes.number.isRequired,
  sourcePosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  targetPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  style: PropTypes.object,
  label: PropTypes.string,
  markerEnd: PropTypes.string,
  data: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired
};

EdgeButton.defaultProps = {
  label: '',
  sourcePosition: 'right',
  targetPosition: 'left',
  style: {}
};
