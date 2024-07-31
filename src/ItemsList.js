import React from 'react';
import { FaTrash } from "react-icons/fa";
import LineItem from './LineItem';

const ItemsList = ({ items, handleCheck, handleDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <LineItem
            key={item.id}
            item={item}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ItemsList;
