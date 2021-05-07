import styled from 'styled-components';

export const MatchSummaryStyled = styled.div`

  .champion-image {
    display: flex;
    margin-left: 10px;
    position: relative;

    .champion-level {
      & > img {
        height: 46px;
        width: 46px;
      }

      span {
        position: absolute;
        left: 2px;
        bottom: 0px;
        color: #fff;
        text-shadow: 1px 0px 2px #000;
        font-weight: bold;
      }
    }

    .summoner-spells {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 5px;

      & > img {
        height: 22px;
        width: 22px;
      }
    }
  }
`;
