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

    .victory {
      display: block;
      position: absolute;
      padding: 0;
      top: 0;
      left: 0;
      width: 10px;
      bottom: 0;

      &.win {
        background-color: #6ed56e;
      }

      &.loss {
        background-color: #a63935;
      }
    }

    .champion-image {
      display: flex;
      margin-left: 10px;

      .champion-level {
        & > img {
          height: 37px;
          width: 37px;
        }

        span {
          position: absolute;
          bottom: 5px;
          left: 18px;
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
      padding: 0 25px;

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
      width: 80px;
      padding-left: 15px;
    }

    .stat {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      width: 100px;
      

      & > span {
        display: flex;
      }
    }

    .match-time {
      display: flex;
      flex-direction: column;
      padding-left: 20px;
    }
  }
`;
