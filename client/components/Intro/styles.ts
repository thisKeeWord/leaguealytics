import styled from 'styled-components';

export const StyledIntro = styled.div`
  color: white;

  h2 {
    margin-top: 0 !important;
    font-size: 1.7rem;
  }

  .intro-body {
    font-size: 1.1rem;

    p {
      span {
        display: inline-block;
      }
      
      .restriction-disclaimer {
        font-size: 12px;
        padding-top: 10px;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;

      .restriction-disclaimer {
        font-size: 0.8rem;
      }
    }
  }
`;
