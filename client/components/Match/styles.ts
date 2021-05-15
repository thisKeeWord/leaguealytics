import styled from 'styled-components';

export const MatchStyled = styled.div`
  .section {
    position: relative;
    box-sizing: border-box;
    min-height: 150px;
    width: 100%;
    // margin: 50px auto 7px auto;
    margin: 0 auto;
    background: transparent none repeat-y;

    ul {
      background-color: #D3D3D3;
    }

    li {
      padding-top: 2px !important;
      padding-bottom: 2px !important;
    }

    // .top {
    //   display: block;
    //   width: 100%;
    //   position: relative;
    //   background: transparent url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-textures-sprite.jpg') no-repeat 50% 0;
    //   top: -14px;
    //   left: 0;
    //   height: 111px;
    //   z-index: 1;

    //   &:before {
    //     content: "";
    //     width: 100%;
    //     height: 136px;
    //     position: absolute;
    //     top: -21px;
    //     left: 0;
    //     background: transparent url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-sprite.png') no-repeat 50% -148px;
    //   }
    // }

    // .content {
    //   background-image: url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-center.png');
    //   background-repeat: repeat-y;
    //   background-position: 50% 0;
    //   position: relative;
    //   bottom: 10px;

      // & >
       .wrapper {
        position: relative;
        max-width: 980px;
        // margin: -121px auto -116px auto;
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

    // .bottom {
    //   width: 100%;
    //   position: absolute;
    //   background: transparent url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-sprite.png') no-repeat 50% -284px;
    //   left: 0;
    //   height: 130px;
    // }
  }
`;
