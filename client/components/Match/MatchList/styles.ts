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
    justify-content: space-between;
    color: white;

    &.win {
      background-color: forestgreen;

      &.active {
        background-color: mediumseagreen;
      }
    
      &:hover {
        background-color: mediumseagreen;
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

    .base-info {
      width: 70px;
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
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .game-mode {
      padding-left: 20px;
      width: 110px;
      text-overflow: ellipsis;
    }

    .items {
      display: flex;
      padding: 0 25px;
      align-items: center;

      .view,
      .inventory-trinket {
        margin: 0 1px;
        display: inline-block;

        .item-icon {
          height: 32px;
          width: 32px;
          
          & > .no-image {
            background-color: rgba(0, 0, 0, 0.1);
            border-left: 1px solid rgba(84, 84, 84, 0.3);
            border-top: 1px solid rgba(84, 84, 84, 0.3);
            border-bottom: 1px solid rgba(255, 255, 255, 0.6);
            border-right: 1px solid rgba(255, 255, 255, 0.6);
            height: 32px;
            width: 32px;
          }

          & > img {
            height: 32px;
            width: 32px;
          }
        }
      }
    }

    .stat {
      display: flex;
      flex-direction: column;
      width: 105px;
      
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
    }
  }
`;
