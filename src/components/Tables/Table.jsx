import React from 'react';
import PropTypes from 'prop-types';

import { DefaultTable } from './TableStyle';

function Table({ itemList, actions, columnList, attributeList }) {
  return (
    <DefaultTable>
      <thead>
        <tr>
          {columnList.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {itemList.map((item, index) => {
          return (
            <tr key={index}>
              {attributeList(item).map((attribute, index) => (
                <td key={index}>{attribute}</td>
              ))}
              <td>{actions(item)}</td>
            </tr>
          );
        })}
      </tbody>
    </DefaultTable>
  );
}

Table.propTypes = {
  itemList: PropTypes.array,
  actions: PropTypes.func,
  columnList: PropTypes.array,
  attributeList: PropTypes.func
};

export default Table;
