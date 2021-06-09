import styled from 'styled-components';

export const StyledMatchEvents = styled.div`
  width: 50%;
  padding: 0 10px 10px 10px;
  
  h4 {
    text-align: center;
    margin-top: 10px;
  }
  
  .events {
    background-color: rgba(0,0,0,0.1);
    border: 1px solid rgba(84,84,84,0.3);
    height: 486px;
    max-height: 486px;
    padding: 2px;
    overflow-y: scroll;

    .champion-kills {
      width: 245px;
      padding: 5px;
      margin: 0 auto;

      .team-kill {
        display: flex;
        justify-content: space-between;

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

      &.blue {
        img.champion {
          width: 40px;
          border: 2px solid #2747e8;
        }
      }

      &.red {
        img.champion {
          width: 40px;
          border: 2px solid #cb2124;
        }
      }

      &.user {
        img.champion {
          width: 40px;
          border: 2px solid purple;
        }
      }

      img {
        height: 40px;
        width: 40px;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    width: auto;
    margin: 0 auto;

    .events {
      height: auto;
      width: 486px;
    }
  }
`;
