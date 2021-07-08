import styled from 'styled-components';

export const MatchTimelineChartStyled = styled.div`
  width: 50%;
  padding: 0 10px 10px 10px;

  .timeline-chart {
    background-color: rgba(0,0,0,0.1);
    border: 1px solid rgba(84,84,84,0.3);
    height: 100%;
    padding: 2px;
    width: 100%;

    h4 {
      text-align: center;
      margin: 10px 0 0 0;
    }

    .time-range {
      margin-bottom: 12px;
      text-align: center;
    }

    .base-chart {
      padding: 0;
      height: 87% !important;
      display: block !important;
      width: 100% !important;
    }
  }

  @media screen and (max-width: 1000px) {
    width: 100%;

    .timeline-chart {
      margin: 0 auto;
      width: 486px;
      height: 486px;
    }
  }
`;
