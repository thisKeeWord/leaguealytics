import styled from 'styled-components';

export const StyledChart = styled.div`
  position: relative;
  display: inline-block;
  padding: 10px;
  width: 50%;
  height: 450px;

  .sort {
    position: absolute;
    right: 10px;
    top: 22px;
    z-index: 1;
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;
