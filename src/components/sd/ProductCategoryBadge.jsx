import React from 'react';
import { CBadge } from '@coreui/react';

const ProductCategoryBadge = ({ category }) => {
  const badgeStyle = {
    backgroundColor: category.color
  };

  return (
    <CBadge style={badgeStyle}>
      {category.name}
    </CBadge>
  );
};

export default ProductCategoryBadge;
