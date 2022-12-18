import styled from 'styled-components';

export const Container = styled.div`
  border: solid #888 2px;
  font-size: 20px;
  height: 500px;
  width: 500px;
`;

export const AnnotationEdgeButton = styled.div`
  button.edge-button {
    display: flex;
    background: #304974;
    border: 1px solid #fff;
    cursor: pointer;
    border-radius: 8px;
    font-size: 0.65rem;
    line-height: 1;
    color: #fff;
  }

  svg {
    height: 10px;
    width: 10px;
    padding-left: 4px;
  }

  .edge-button:hover {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
  }
`;

export const ForeignObject = styled.foreignObject`
  div.edgebutton-foreignobject {
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
