import React from 'react';

import { CustomButtonContainer } from './custom-button.styles';

const CustonButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>
    {children}
  </CustomButtonContainer>
);

export default CustonButton;
