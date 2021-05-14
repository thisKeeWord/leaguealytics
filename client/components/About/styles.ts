import styled from 'styled-components';

export const StyledAbout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  .about-body {
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

    .disclaimer {
      font-size: 10px;
    }
  }
`;
