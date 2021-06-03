import styled from 'styled-components';

export const MapStyled = styled.div`
  padding: 0 10px 10px 10px;

  #map {
    display: inline-block;
    padding: 2px;
    background-color: rgba(0,0,0,0.1);
    border: 1px solid rgba(84,84,84,0.3);

    .champIcons > image {
      height: 24px;
      width: 24px;
      transform: translate(-12px, -12px)
    }
    
    rect {
      height: 25px;
      width: 25px;
      transform: translate(-12.5px, -12.5px);
    }
  }


  @media screen and (max-width: 768px) {
    padding: 10px;
    margin: 0 auto;
    text-align: center;
  }
`;
