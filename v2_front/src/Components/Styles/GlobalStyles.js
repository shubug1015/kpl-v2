import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body{
        /* font-family: 'NanumSquareRound'; */
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 15px;
        font-weight: 400;
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.blackColor};
        padding-top: ${(props) => props.theme.headerHeight};
    }    
`;

export default globalStyles;
