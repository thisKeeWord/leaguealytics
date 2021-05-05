import styled from 'styled-components';

export const StyledChart = styled.div`
  position: relative;
  display: inline-block;
  padding: 10px;
  width: 50%;
  height: 65%;

  .sort {
    position: absolute;
    right: 10px;
    top: 22px;
    z-index: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
