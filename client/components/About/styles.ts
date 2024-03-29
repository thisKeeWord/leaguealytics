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

    .links {
      display: flex;
      margin-bottom: 5px;
      font-size: 15px;

      .home-link {
        margin-right: 10px;
        padding-right: 0;
      }
    }

    a {
      padding-right: 10px;

      #icon-link {
        height: 25px;
        width: 25px;
        color: black;
      }
    }

    .notice {
      font-size: 12px;
    }

    .disclaimer {
      font-size: 10px;
    }
  }

  @media screen and (max-width: 1000px) {
    font-size: 1rem;

    .disclaimer {
      font-size: 0.8rem;
    }

    .about-body {
      width: 100%;
      padding: 0 45px;
    }
  }
`;
