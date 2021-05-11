import styled from 'styled-components';

export const MatchSummaryStyled = styled.div`
  .by-teams {
    display: flex;

    .team-100 {
      width: 50%;
      margin-right: 1px;
    }

    .team-200 {
      width: 50%;
      margin-left: 1px;
    }

    .match-summary {
      display: flex;
      align-items: center;
      padding: 5px 0;
      position: relative;
      border-bottom: 1px solid #dbdfe0;
      border-right: 1px solid #dbdfe0;
      margin: 1px 0;
      width: 100%;
      font-size: 12px;

      &.team100 {
        background-color: #f5fafe;

        &.currentUser {
          background-color: #dbeeff !important;        
        }
      }

      &.team200 {
        background-color: #fff3f3;

        &.currentUser {
          background-color: #f2d7d7 !important;
        }
      }

      .team {
        display: block;
        position: absolute;
        padding: 0;
        top: 0;
        width: 5px;
        bottom: 0;

        &.blue {
          background-color: #2747e8;
        }

        &.red {
          background-color: #cb2124;
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
          width: 110px;
          padding-left: 10px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .kda {
          width: 70px;
          padding: 5px;
          text-align: center;
        }
      }
    }
  }

  .items-list {
    display: flex;
    width: 111px;
    padding: 10px;
    align-items: center;

    .item-set-1 {
      width: 75%;
    }

    .view,
    .inventory-trinket {
      height: 22px;
      width: 22px;
      display: inline-block;

      .no-img, img {
        height: 22px;
        width: 22px;
        padding: 1px;
      }
    }
  }

  .cs {
    width: 45px;
    padding: 5px;
    text-align: center;
  }

  .gold-earned {
    width: 50px;
    padding: 5px;
    text-align: center;
  }

  .charts {
    background-color: #e9eaec;
  }

  .team-summary {
    display: flex;
    position: relative;
    width: 100%;
    border-bottom: 1px solid #d7d7d7;

    &.blue {
      background-color: #f5fafe;
    }

    &.red {
      background-color: #fff3f3;
    }

    .team-marker {
      display: block;
      position: absolute;
      padding: 0;
      width: 5px;
      height: 100%;

      &.blue {
        background-color: #2747e8;
      }

      &.red {
        background-color: #cb2124;
      }
    }

    .team-gem {
      display: block;
      background-position: center;
      background-repeat: no-repeat;
      margin-left: 5px;
      width: 40px;

      &.blue {
        background-image: url('../../../../images/team-blue.png');
      }

      &.red {
        background-image: url('../../../../images/team-red.png');
      }
    }

    .game-conclusion {
      width: 200px;
      font-size: 24px;
    }

    .gold {
      padding-left: 23px;
      text-align: right;
      background-image: url('../../../../images/gold.png');
      background-position: 0% 50%;
      background-repeat: no-repeat;
      font-size: 20px;
      margin-top: auto;
      margin-bottom: auto;
    }

    .kills {
      padding-left: 23px;
      text-align: right;
      background-image: url('../../../../images/kda.png');
      background-position: 0% 50%;
      background-repeat: no-repeat;
      margin: auto 20px auto auto;
      font-size: 20px;
    }

  }

  .icon-bar {
    display: flex;
    width: 100%;

    .team-bar {
      display: block;
      position: absolute;
      padding: 0;
      width: 5px;

      &.blue {
        background-color: #2747e8;
      }

      &.red {
        background-color: #cb2124;
      }
    }

    &.blue {
      background-color: #f5fafe;
    }

    &.red {
      background-color: #fff3f3;
    }

    & > div {
      height: 25px;
    }

    & > .champion {
      background-image: url('../../../../images/champion.png');
      background-repeat: no-repeat;
      background-position: 21px center;
    }

    & > .champion-col {
      width: 195px;
      padding: 0 5px 0 10px;
    }

    & > .kills {
      background-image: url('../../../../images/kda.png');
      background-repeat: no-repeat;
      background-position: center;
    }

    & > .kills-col {
      width: 70px;
      padding: 0 5px;
    }

    & > .items {
      background-image: url('../../../../images/items.png');
      background-repeat: no-repeat;
      background-position: center;
    }

    & > .items-col {
      width: 111px;
      padding-left: 5px;
      padding-right: 5px;
    }

    & > .minions {
      background-image: url('../../../../images/minions.png');
      background-repeat: no-repeat;
      background-position: center;
    }

    & > .gold {
      background-image: url('../../../../images/gold.png');
      background-repeat: no-repeat;
      background-position: center;
    }

    & > .minions-col {
      width: 45px;
      padding: 0 5px;
    }

    & > .gold-col {
      width: 50px;
      padding: 0 5px;
    }
  }
`;
