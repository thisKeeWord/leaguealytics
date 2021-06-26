import React, { FunctionComponent } from 'react';
import { StyledLoadingIndicator } from './styles';

const LoadingIndicator: FunctionComponent = () => (
  <StyledLoadingIndicator data-testid="loading-indicator" />
);

export default LoadingIndicator;
