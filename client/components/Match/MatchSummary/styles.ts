import styled from 'styled-components';

export const MatchSummaryStyled = styled.div`
  .Mui-selected {
    color: black;
  }

  .MuiTabs-indicator {
    background-color: black;
  }

  .MuiTabs-root.overview {
    border-bottom: 1px solid lightgray;

    .MuiTab-root {
      font-weight: bold;
    }
  }

  .by-teams {
    color: white;

    .team-100 {
      width: 100%%;
    }

    .team-200 {
      width: 100%%;
    }

    .match-summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px;
      position: relative;
      border-bottom: 1px solid #dbdfe0;
      border-right: 1px solid #dbdfe0;
      width: 100%;

      &.team100 {
        background-color: rgb(47, 78, 233);

        &.currentUser {
          background-color: #5d76ee !important;        
        }
      }

      &.team200 {
        background-color: rgb(203, 33, 36);

        &.currentUser {
          background-color: #df3a3c !important;
        }
      }

      .section-1 {
        display: flex;
        align-items: center;
        font-size: 12px;

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

            .spell1,
            .spell2 {
              height: 22px;
              width: 22px;

              & > img {
                height: 22px;
                width: 22px;
              }
            }
          }
        }

        .summonerName {
          width: 90px;
          padding-left: 10px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }

      .kda {
        width: 70px;
        padding: 5px;
        display: flex;
        align-items: center;


        & > img {
          height: 15px;
          width: 15px;
          margin-right: 2px;
        }
      }
    }
  }

  .items-list {
    display: flex;
    padding: 10px;
    align-items: center;

    .view,
    .inventory-trinket {
      height: 37px;
      width: 37px;
      display: inline-block;
      margin: 0 1px;

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

  .cs-gold {
    width: 80px;
    text-align: center;
    // margin-left: auto;

    .cs {
      display: flex;
      align-items: center;
      padding: 5px 5px 2.5px 5px;

      & > img {
        height: 15px;
        width: 15px;
      }
    }

    .gold-earned {
      display: flex;
      align-items: center;
      padding: 2.5px 5px 5px 5px;

      & > img {
        height: 12px;
        width: 16px;
      }
    }
  }

  .charts {
    background-color: #e9eaec;
  }

  .team-summary {
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
    border-bottom: 1px solid #d7d7d7;
    height: 45px;
    padding: 0 10px;

    &.blue {
      background-color: rgb(47, 78, 233);
    }

    &.red {
      background-color: rgb(203, 33, 36);
    }

    .game-conclusion {
      width: 65px;
      font-size: 24px;
      margin-top: auto;
      margin-bottom: auto;
    }

    .gold {
      display: flex;
      align-items: center;
      padding-left: 23px;
      text-align: right;
      font-size: 20px;
      margin: 0 auto;

      & > img {
        margin-right: 3px;
      }
    }

    .kills {
      display: flex;
      align-items: center;
      padding-left: 23px;
      text-align: right;
      font-size: 20px;

      & > img {
        margin-right: 3px;
      }
    }
  }

  .team-objectives {
    width: 100%;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-right: 1px solid #dbdfe0;
    border-bottom: 1px solid #d7d7d7;

    &.blue {
      background-color: rgb(47, 78, 233);
    }

    &.red {
      background-color: rgb(203, 33, 36);
    }

    .bans-container {
      display: flex;
      align-items: center;
      margin-left: 10px;

      img {
        width: 21px;
        height: 21px;
        margin-left: 2px;
      }
    }

    .objectives-container {
      display: flex;
      align-items: center;
      margin-right: 10px;

      & > div {
        display: flex;
        padding: 0 2px;

        & > img {
          width: 21px;
          height: 21px;
        }

        & > span {
          padding-left: 2px;
        }
      }
    }
  }

  .blank-div {
    height: 10px;
    width: 100%;
    background-color: #4c4c4c;
  }

  .view {
    .MuiTabs-flexContainer {
      justify-content: center;
    }
  }


  @media screen and (max-width: 1000px) {
    .view {
      margin-bottom: 75px;
    }
  }
`;
