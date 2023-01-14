import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import { QuestionCircleFill } from '@styled-icons/bootstrap/QuestionCircleFill';

import Button from 'components/Button/Button';
import {
  Container,
  LineContainer,
  ListContainer,
  Item,
  ButtonStyle,
  DivFlex,
  QuestionBox
} from './styles';
import { FontSize } from 'styled-icons/boxicons-regular';

function SelectionLit({
  label,
  options,
  selectedOptions,
  addSelectedOption,
  placeholder,
  hintText
}) {
  const [showTextBox, setShowTextBox] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const optionList = options.map((option) => {
    return { label: option.name, value: option._id };
  });

  function addItem(item) {
    return selectedOptions.some((op) => op === item.value)
      ? toast.error(`${label.slice(0, -1)} já existe.`)
      : addSelectedOption([...selectedOptions, item.value]);
  }

  function removeItem(stageIndex) {
    const editedList = selectedOptions.filter(
      (item, index) => index !== stageIndex
    );
    addSelectedOption(editedList);
  }

  return (
    <LineContainer>
      <ListContainer>
        <DivFlex>
          <div>{label}</div>
          <div
            onClick={() => setShowTextBox(!showTextBox)}
            style={{ cursor: 'pointer' }}
          >
            <QuestionCircleFill size={20} />
          </div>
          {showTextBox && (
            <>
              <QuestionBox>{hintText}</QuestionBox>
            </>
          )}
        </DivFlex>
        {selectedOptions?.length > 0 ? (
          selectedOptions.map((option, index) => {
            const { name } = options.find((item) => item._id === option);
            return (
              <Item key={index}>
                <div className="removeBox" onClick={() => removeItem(index)}>
                  x
                </div>
                {name}
              </Item>
            );
          })
        ) : (
          <text style={{ fontSize: '18px' }}>{`Ainda não há ${label}`}</text>
        )}
      </ListContainer>
      <Container>
        <ButtonStyle>
          <Dropdown
            className="dropdown"
            options={optionList}
            value={placeholder}
            onChange={(e) => setSelectedOption(e)}
          />
        </ButtonStyle>
        <Button
          onClick={() => addItem(selectedOption)}
          buttonType="add"
          text="Adicionar"
        />
      </Container>
    </LineContainer>
  );
}

SelectionLit.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  addSelectedOption: PropTypes.func.isRequired,
  hintText: PropTypes.string
};

export default SelectionLit;
