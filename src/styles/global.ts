import { createGlobalStyle } from 'styled-components';

import blackBg from '../assets/black-bg.jpg'

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body{
        background: #F0F0F5 url(${blackBg}) 70% top;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font: 16px Source Sans Pro, sans-serif;
    }

    #root {
        max-width: 1300px;
        margin: 0 auto;
        padding: 5px 0px;
    }

    button {
        cursor: pointer;
    }
`;