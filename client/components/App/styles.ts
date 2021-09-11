import styled from 'styled-components';

export const StyledApp = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #4c4c4c;

  .container {
    margin: 0 auto;
    padding: 50px 20px 0 20px;
    max-width: 980px;

    .about-link {
      width: fit-content;
      margin-left: auto;
      margin-bottom: 5px;
    }

    &.left-display .about-link {
      margin-left: 0 !important;
    }
  
    a {
      padding-top: 10px;
      display: block;
      text-align: right;
      color: white;

      &:hover: {
        color: lightgray;
      }
    }

    .root-form {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0 20px 0; 
      margin: 0 auto;

      .username-refresh {
        padding-right: 12px;
        display: flex;
        color: #fff;

        .username-level {
          display: flex;
          flex-direction: column;
          
          .username {
            font-size: 30px;
          }

          .level {
            font-size: 14px;
          }
        }

        .refresh-button {
          color: #fff;
          min-width: unset !important;
          height: auto !important;
          margin-left: 10px;

          .MuiTouchRipple-root {
            display: none;
          }

          i {
            font-size: 20px;
          }
        }
      }

      .search {
        box-shadow: 1px 1px 1px 1px darkcyan;
        box-sizing: border-box;
        border-radius: 5px;
        width: fit-content;
        background: white;
        display: flex;
        align-items: center;

        & > input {
          padding: 16px;
          border: none;
          box-sizing: border-box;
          flex: 1;

          &:focus {
            outline: none;
          }
        }

        & > button {
          height: 51px;
          width: 51px;
          padding: 0;
          border: none;
          background: white;

          &:focus {
            outline: none;
          }
        }

        p {
          margin-top: 0;
          position: absolute;
          bottom: -20;
        }

        label {
          background-color: white;
        }

        fieldset {
          border: none;
        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    a {
      font-size: 1rem;
    }

    input {
      font-size: 1rem;
    }
  }
`;
