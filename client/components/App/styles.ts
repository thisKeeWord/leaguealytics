import styled from 'styled-components';

export const StyledApp = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #4c4c4c;
  
  a {
    padding: 10px 40px 0 0;
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
    padding: 5px 40px 20px 40px;

    .username {
      color: #fff;
      font-size: 36px;
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
`;
