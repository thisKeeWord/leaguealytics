import styled from 'styled-components';

export const StyledMatchTimeline = styled.div`
  .slider-container {
    text-align: center;
    padding: 20px 30px;
    width: 100%;

    .MuiSlider-root {
      width: 50% !important;
      color: unset !important;
    }

    .MuiSlider-thumb {
      & > span {
        transform: scale(1) translateY(0px) !important;
        top: -20px !important;
      }

      .MuiSlider-valueLabel {
        left: unset !important;

        & > span {
          height: unset !important;
          width: unset !important;
          transform: none !important;
          border-radius: unset !important;
          background-color: unset !important;

          & > span {
            transform: none !important;
            color: black !important;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .slider-container {
      position: fixed;
      bottom: 0;
      padding: 20px 50px;
      z-index: 2;
      background-color: #4c4c4c;
      color: #fff;
      left: 0;
      right: 0;
      height: 90px;

      .MuiSlider-root {
        width: 100% !important;
        color: unset !important;

        & > span.MuiSlider-thumb > span > span > span {
          color: #fff !important;
        }
      }
    }
  }

  .map-events {
    display: flex;
    
    @media screen and (max-width: 1000px) {
      flex-direction: column;
    }
  }
`;
