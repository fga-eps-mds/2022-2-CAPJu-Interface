import styled from 'styled-components';

export const FlowContainer = styled.div`
  border: solid #888 2px;
  font-size: 20px;
  height: 500px;
  width: 500px;
  z-index: 0;

  .react-flow__attribution {
    display: none;
  }
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

export const Item = styled.div`
  display: flex;
  align-items: center;
`;

export const LineContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-right: 7px;
  margin-left: 7px;
  width: 100%;

  text {
    margin-right: 15px;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95.8%;
  justify-content: space-around;
  background-color: #d9d9d9;
  border-bottom: solid #9b8f8f 2px;
  border-right: solid #9b8f8f 2px;
  border-left: solid #9b8f8f 2px;
  border-radius: 0px 0px 11px 11px;
  margin: 0px 10px 0px 10px;
  padding-bottom: 6px;
  padding-right: 6px;
  color: black;
  font-size: 20px;
  z-index: 2001;

  div {
    font-size: 15px;
    width: 100%;
  }
`;

export const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 210px;
  justify-content: space-between;
  background-color: #d9d9d9;
  border: solid #9b8f8f 2px;
  border-radius: 11px;
  padding: 8px;
  margin: 0px 10px 0px 10px;
  color: black;
  z-index: 1;
  align-self: center;
  height: 1.5em;
  position: relative;
  width: auto;

  .dropdown {
    overflow: hidden;
    break-word: break-all;
    background-color: #d9d9d9;
    width: 100%;
  }
  div {
    justify-content: center;
    align-items: center;
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-width: 393px;
  min-width: 393px;
  height: 130px;
  border-radius: 11px 11px 0px 0px;
  background-color: #d9d9d9;
  border-top: solid #9b8f8f 2px;
  border-right: solid #9b8f8f 2px;
  border-left: solid #9b8f8f 2px;
  margin: 0px 10px 0px 10px;
  padding-right: 6px;
  color: black;
  font-size: 20px;
  overflow-y: auto;
  scrollbar-width: none;
  height: 12em;

  ::-webkit-scrollbar {
    background-color: white;
    border-radius: 10px;
    width: 10px;
    margin-right: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    box-shadow: inset 0 0 5px black;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  .removeBox {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border: solid #9b8f8f 1px;
    width: 16px;
    height: 16px;
    color: red;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;

    :hover {
      background-color: #d4423f;
      color: white;
    }
  }

  div {
    font-size: 15px;
    align-self: flex-start;
    margin: 5px 5px 2px 10px;
  }

  text {
    font-size: 18px;
    margin-top: 25px;
    align-self: center;
  }
`;

export const SelectorWrapper = styled.div`
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  flex-direction: row;
  gap: 10px;
  font-size: 20px;
  border-radius: 20px;
`;

export const SequenceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  justify-content: space-between;
  background-color: #d9d9d9;
  border: solid #9b8f8f 2px;
  margin: 0px 5px 0px 5px;
  color: black;
  border-radius: 11px;
  font-size: 20px;
  word-wrap: break-all;
  z-index: 1000;

  div {
    text-overflow: ellipsis;
    font-size: 15px;
  }

  text {
    margin-right: 15px;
  }
`;

export const DivFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 90%;
  position: relative;

  div {
    font-size: 18px;
  }
`;

export const QuestionBox = styled.div`
  background-color: #d9d9d9;
  border: solid black 2px;
  border-radius: 11px;
  padding: 8px;
  z-index: 2000;
  position: absolute;
  top: 1.6em;
`;
