import styled from 'styled-components';

export const StyledMatchEvents = styled.div`
  width: 50%;
  padding: 0 10px 10px 10px;
  max-height: 486px;
  overflow-y: scroll;

  h4 {
    text-align: center;
    margin-top: 10px;
  }

  .events {
    background-color: rgba(0,0,0,0.1);
    border: 1px solid rgba(84,84,84,0.3);
    padding: 2px;

    .event-champion-kills {
      display: flex;
      justify-content: space-evenly;
      padding: 5px;

      .champion-killer {
        height: 40px;

        &.blue {
          width: 40px;

          img {
            border: 2px solid #2747e8;
          }
        }

        &.red {
          width: 40px;

          img {
            border: 2px solid #cb2124;
          }
        }

        &.user {
          width: 40px;

          img {
            border: 2px solid purple;
          }
        }

        img {
          height: 40px;
          width: 40px;
        }
      }

      .desc-icon {
        padding: 7px;

        img {
          height: 24px;
          width: 24px;
        }
      }

      .team-assist {
        display: flex;
        padding: 3px 1px 0 0;

        .champion-assister {
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

      .champion-victim {
        height: 40px;
        width: 40px;

        &.blue {
          img {
            border: 2px solid #2747e8;
          }
        }

        &.red {
          img {
            border: 2px solid #cb2124;
          }
        }

        &.user {
          img {
            border: 2px solid purple;
          }
        }

        img {
          height: 40px;
          width: 40px;
        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    margin: 0 auto;
  }
`;
