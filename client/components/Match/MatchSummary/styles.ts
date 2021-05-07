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
        }
      }
    }
  }

  .charts {
    background-color: #e9eaec;
  }
`;
