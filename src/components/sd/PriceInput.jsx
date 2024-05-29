import React from 'react';
import { InputNumber } from 'antd';

const PriceInput = ({ value, onChange }) => {
  const handleCurrencyChange = (newValue) => {
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <InputNumber
      size='large'
      value={value}
      formatter={(value) =>
        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') 
      }
      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
      onChange={handleCurrencyChange}
      style={{ width: '100%' }}
    />
  );
};

export default PriceInput;
