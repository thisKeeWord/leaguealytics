import styled from 'styled-components';

export const MatchStyled = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 100%;

  &.active {
    background-color: #dcdcdc;
  }

  &:hover {
    background-color: #dcdcdc;
  }

  .match-button {
    padding: 7px;
    width: 100%;
    display: flex;
    align-items: center;

    .champion-image {
      display: flex;

      .champion-level {
        & > img {
          height: 37px;
          width: 37px;
        }

        span {
          position: absolute;
          bottom: 5px;
          left: 8px;
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
          height: 17px;
          width: 17px;
        }
      }
    }

    .champion-name {
      padding-left: 10px;
      width: 100px;
    }

    .game-mode {
      padding-left: 20px;
      width: 145px;
    }

    .items {
      display: flex;
      padding: 0 15px;

      .view {
        padding: 0 1px;

        .item-icon {
          height: 37px;
          width: 37px;
          
          & > .no-image {
            background-color: rgba(0, 0, 0, 0.1);
            border-left: 1px solid rgba(84, 84, 84, 0.3);
            border-top: 1px solid rgba(84, 84, 84, 0.3);
            border-bottom: 1px solid rgba(255, 255, 255, 0.6);
            border-right: 1px solid rgba(255, 255, 255, 0.6);
            height: 37px;
            width: 37px;
          }

          & > img {
            height: 37px;
            width: 37px;
          }
        }
      }
    }

    .kda {
      width: 70px;
    }

    .stat {
      padding-left: 8px;
      display: flex;
      flex-direction: column;
      min-width: 75px;

      & > span {
        display: flex;
      }
    }

    .date {
      padding-left: 8px;
    }
  }
`;
