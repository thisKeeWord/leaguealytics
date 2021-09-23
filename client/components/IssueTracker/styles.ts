import styled from 'styled-components';

export const StyledIssueTracker = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  .issue-body {
    width: 50%;

    .links {
      display: flex;
      margin-bottom: 5px;
      font-size: 15px;

      .home-link {
        margin-right: 10px;
      }
    }

    .email {
      color: inherit;
    }
  }

  @media screen and (max-width: 1000px) {
    font-size: 1rem;

    .issue-body {
      width: 100%;
      padding: 0 45px;
    }
  }
`;
