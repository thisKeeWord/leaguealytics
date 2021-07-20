import styled from 'styled-components';

export const MatchPlayerBuildsStyled = styled.div`
  width: 50%;
  padding: 0 10px 10px 10px;

  .match-player-builds {
    background-color: rgba(0,0,0,0.1);
    border: 1px solid rgba(84,84,84,0.3);
    height: 486px;
    max-height: 486px;
    padding: 2px;
    width: 100%;
    overflow-y: scroll;

    h4 {
      text-align: center;
      margin: 10px 0 0 0;
    }

    .time-range {
      margin-bottom: 12px;
      text-align: center;
    }

    .player-items {
      display: flex;
      padding: 7px 10px;

      .player {
        display: flex;
        flex-direction: column;
        width: 75px;

        .name {
          width: 75px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        img {
          height: 40px;
          width: 40px;
        }
      }

      .items-list {
        padding-left: 10px;
        
        img {
          height: 30px;
          width: 30px;
          margin: 1px;
        }
      }

      &.blue {
        color: #2747e8;

        img {
          border: 2px solid #2747e8;
        }
      }

      &.red {
        color: #cb2124;

        img {
          border: 2px solid #cb2124;
        }
      }

      &.user {
        color: purple;

        img {
          border: 2px solid purple;
        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    width: 100%;

    .match-player-builds {
      margin: 0 auto;
      width: 486px;
      height: 486px;
    }
  }
`;
