import styled from 'styled-components';

export const MatchStyled = styled.div`
  .section {
    position: relative;
    box-sizing: border-box;
    min-height: 150px;
    width: 100%;
    margin: 0 auto;
    background: transparent none repeat-y;

    ul {
      background-color: #D3D3D3;
    }

    li {
      padding: 2px 0 !important;
    }

    .wrapper {
      position: relative;
      margin: 0 auto;
      padding: 20px 0;
      min-height: 350px;
      z-index: 2;

      .match-list {
        padding: 0 !important;

        & > li {
          padding: 0 !important;
          justify-content: center;
          border-left: 1px solid #fff;
          border-top: 1px solid #fff;
          border-right: 1px solid #d7d7d7;
          border-bottom: 1px solid #d7d7d7;
          background-color: #efefef;
        }
      }

      .paginator {
        margin-bottom: 10px;

        & > ul {
          justify-content: center;
          background-color: darkgray;
        }
    
        button {
          color: white !important;

          &.Mui-selected {
            background-color: gray !important;
          }
        }
      }

      .match-info {
        background-color: #efefef;
      }
    }
  }
`;
