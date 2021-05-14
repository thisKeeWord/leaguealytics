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
      padding: 5px;
      position: relative;
      border-bottom: 1px solid #dbdfe0;
      border-right: 1px solid #dbdfe0;
      margin: 1px 0;
      width: 100%;

      &.team100 {
        background-color: #9999ff;
        
        &.currentUser {
          background-color: #7f7fff !important;        
        }
      }

      &.team200 {
        background-color: #ffa5a5;

        &.currentUser {
          background-color: #ff4c4c !important;
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
        margin: 0 auto;
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

  .cs-gold {
    width: 80px;
    text-align: center;
    margin-left: auto;

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
    position: relative;
    width: 100%;
    border-bottom: 1px solid #d7d7d7;
    height: 45px;
    padding: 0 10px;

    &.blue {
      background-color: #9999ff;
    }

    &.red {
      background-color: #ffa5a5;
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
      margin-left: auto;
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
      background-color: #9999ff;
    }

    &.red {
      background-color: #ffa5a5;
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
`;
