import styled from 'styled-components';

export const MatchStyled = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 100%;

  .match-button {
    padding: 7px;
    width: 100%;
    display: flex;
    align-items: center;

    &.win {
      background-color: #6ed56e;

      &.active {
        background-color: #9ce29c;
      }
    
      &:hover {
        background-color: #9ce29c;
      }
    }

    &.loss {
      background-color: #c85551;

      &.active {
        background-color: #da8d8b;
      }
    
      &:hover {
        background-color: #da8d8b;
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
      }

      .level-spells {
        display: flex;
        flex-direction: column;
        padding-left: 5px;

        .spells {
          display: flex;
          justify-content: space-between;

          & > img {
            height: 17px;
            width: 17px;
          }
        }

        span {
          font-weight: bold;
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

    .stat {
      padding-left: 40px;
      display: flex;
      flex-direction: column;
      width: 130px;
      

      & > span {
        display: flex;
        align-items: center;

        & > img {
          height: 16px;
          width: 16px;
          margin-right: 5px;
        }
      }

      .gold > img {
        height: 12px !important;
      }
    }

    .match-time {
      display: flex;
      flex-direction: column;
      margin: auto 10px auto auto;
    }
  }
`;
