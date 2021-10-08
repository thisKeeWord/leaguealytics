import styled from 'styled-components';

export const StyledMatchEvents = styled.div`
  width: 50%;
  padding: 0 10px 10px 10px;
  
  h4 {
    text-align: center;
    margin: 10px 0 0 0;
  }

  .time-range {
    margin-bottom: 12px;
    text-align: center;
  }
  
  .events {
    background-color: rgba(0,0,0,0.1);
    border: 1px solid rgba(84,84,84,0.3);
    height: 486px;
    max-height: 486px;
    padding: 2px;
    overflow-y: scroll;

    .champion-kills,
    .monster-kills,
    .building-kills {
      width: 245px;
      padding: 5px;
      margin: 0 auto;

      .team-champion-kill,
      .team-monster-kill,
      .team-building-kill {
        display: flex;
        justify-content: space-between;
        align-items: center;
        

        span.minion {
          height: 40px;
          width: 40px;
          display: flex;
          align-items: center;

          &.blue {
            color: #2747e8;
          }
  
          &.red {
            color: #cb2124;
          }
        }

        img {
          height: 40px;
          width: 40px;

          &.building-victim {
            margin-top: -8px;
          }

          &.blue {
            border: 2px solid #2747e8;
          }
  
          &.red {
            border: 2px solid #cb2124;
          }
  
          &.user {
            border: 2px solid purple;
          }

          &.desc-icon {
            height: 20px;
            width: 20px;
          }
        }
      }

      .event-desc {
        display: flex;
        justify-content: space-between;

        .building-desc {
          margin-left: auto;
          font-size: 12px;
        }
      }

      .team-assist {
        display: flex;
        padding: 3px 1px 0 0;

        .assister {
          height: 20px;
          width: 20px;


          &.blue {
            img {
              border: 1px solid #2747e8;
            }
          }

          &.red {
            img {
              border: 1px solid #cb2124;
            }
          }

          &.user {
            img {
              border: 1px solid purple;
            }
          }

          img {
            height: 20px;
            width: 20px;
          }
        }
      }
    }

    .ward-event {
      width: 245px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      margin: 0 auto;

      span {
        padding: 0 5px;
      }

      img {
        height: 40px;
        width: 40px;

        &.blue {
          border: 2px solid #2747e8;
        }
  
        &.red {
          border: 2px solid #cb2124;
        }
  
        &.user {
          border: 2px solid purple;
        }
      }
    }

    .ward-timestamp,
    .champion-timestamp,
    .monster-timestamp,
    .building-timestamp {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 100%;

      .timestamp {
        font-size: 10px;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    width: auto;
    margin: 0 auto;

    .events {
      width: 486px;
    }
  }
`;
