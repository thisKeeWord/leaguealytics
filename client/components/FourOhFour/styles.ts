import styled from 'styled-components';

export const StyledFourOhFour = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  .four-oh-four-body {
    width: 50%;

    .linkToPages {
      padding-left: 4px;
      font-size: 15px;
      margin: 0;
      list-style: none;
    }

    a {
      padding-right: 10px;

      #icon-link {
        height: 25px;
        width: 25px;
        color: black;
      }
    }

    .alistar-gif {
      float: right;

      img {
        height: 240px;
        width: 240px;
      }
    }
  }
}

  @media screen and (max-width: 1000px) {
    font-size: 1rem;

    .four-oh-four-body {
      width: 100%;
      padding: 0 45px;
    }
  }
`;
