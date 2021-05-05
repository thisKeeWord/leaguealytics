import styled from 'styled-components';

export const MatchStyled = styled.div`
  .section {
    position: relative;
    box-sizing: border-box;
    min-height: 150px;
    width: 100%;
    margin: 50px auto 7px auto;
    background: transparent none repeat-y;

    .top {
      display: block;
      width: 100%;
      position: relative;
      background: transparent url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-textures-sprite.jpg') no-repeat 50% 0;
      top: -14px;
      left: 0;
      height: 111px;
      z-index: 1;

      &:before {
        content: "";
        width: 100%;
        height: 136px;
        position: absolute;
        top: -21px;
        left: 0;
        background: transparent url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-sprite.png') no-repeat 50% -148px;
      }
    }

    .content {
      background-image: url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-center.png');
      background-repeat: repeat-y;
      background-position: 50% 0;
      position: relative;
      bottom: 10px;

      & > .wrapper {
        position: relative;
        max-width: 980px;
        margin: -121px auto -116px auto;
        padding: 20px 20px;
        min-height: 350px;
        z-index: 2;

        .content-border {
          box-sizing: border-box;
          padding: 4px;
          background-color: transparent;
          -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#1A000000,endColorstr=#1A000000);
          filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#1A000000,endColorstr=#1A000000);
          background-color: rgba(0,0,0,0.1);
          border-left: 1px solid rgba(84,84,84,0.3);
          border-top: 1px solid rgba(84,84,84,0.3);
          border-bottom: 1px solid rgba(255,255,255,0.6);
          border-right: 1px solid rgba(255,255,255,0.6);
      
          hr {
            background-color: white !important;
          }
        }

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
          padding: 10px;
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

    .bottom {
      width: 100%;
      position: absolute;
      background: transparent url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-sprite.png') no-repeat 50% -284px;
      left: 0;
      height: 130px;
    }
  }
`;
