import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { getBezierPath, getBezierEdgeCenter } from 'react-flow-renderer';
import { AnnotationEdgeButton, ForeignObject } from './styles';
import EditIcon from '@mui/icons-material/Edit';
import Button from '../Button/Button';

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
  const foreignObjectHeight = label.length >= 40 ? 30 : 13;
  const foreignObjectWidth = label.length * 5 + 30;
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

  const handleClick = useCallback(
    () => onClick(source, target, label),
    [onClick, source, target, label]
  );

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
        onClick={handleClick}
      >
        <AnnotationEdgeButton className="edgebutton-foreignobject">
          <Button className={'edge'}>
            {label}
            {label !== '+ Adicionar nova anotação' && <EditIcon />}
          </Button>
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
