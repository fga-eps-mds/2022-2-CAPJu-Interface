import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import { Check } from '@styled-icons/entypo/Check';
import { Link } from 'react-router-dom';
import { Eye } from '@styled-icons/entypo';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { UserPlus } from '@styled-icons/fa-solid';
import { Delete } from '@styled-icons/typicons/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { DefaultTable } from './TableStyle';

const iconList = {
  eye: Eye,
  delete: DeleteForeverIcon,
  addUser: UserPlus,
  edit: EditIcon,
  link: Link,
  check: Check,
  deny: Delete
};

function Table({ itemList, actionList, columnList, attributeList }) {
  return (
    <DefaultTable>
      <thead>
        <tr>
          {columnList.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
          <th className="actions-column">Ações</th>
        </tr>
      </thead>
      <tbody>
        {itemList.map((item, index) => {
          return (
            <tr key={index}>
              {attributeList(item).map((attribute, index) => (
                <td key={index}>{attribute}</td>
              ))}
              <td className="actions-column">
                {actionList.map((action, index) => {
                  const ActionIcon = iconList[action.type];
                  return ActionIcon == Link ? (
                    <Tooltip title={action.tooltip} key={index}>
                      <Link
                        to={action.linkTo}
                        state={item}
                        disabled={action.disabled}
                      >
                        {action.linkIcon}
                      </Link>
                    </Tooltip>
                  ) : (
                    <Tooltip title={action.tooltip} key={index}>
                      <ActionIcon
                        onClick={() => action.action(item)}
                        className={action.className}
                        disabled={action.disabled}
                      />
                    </Tooltip>
                  );
                })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </DefaultTable>
  );
}

Table.propTypes = {
  itemList: PropTypes.array,
  actionList: PropTypes.array,
  columnList: PropTypes.array,
  attributeList: PropTypes.func,
  disabled: PropTypes.bool
};

export default Table;
