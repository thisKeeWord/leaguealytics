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
      padding-top: 2px !important;
      padding-bottom: 2px !important;
    }

    .wrapper {
      position: relative;
      max-width: 980px;
      margin: 0 auto;
      padding: 20px;
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
        }
    
        button {
          color: white !important;
        }
      }

      .match-info {
        background-color: #efefef;
      }
    }
  }
`;
