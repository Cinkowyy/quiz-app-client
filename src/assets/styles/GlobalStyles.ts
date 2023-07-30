import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import NunitoBold from "../fonts/Nunito-Bold.ttf"
import NunitoSemiBold from "../fonts/Nunito-SemiBold.ttf"
import NunitoMedium from "../fonts/Nunito-Medium.ttf"
import NunitoRegular from "../fonts/Nunito-Regular.ttf"
import NunitoLight from "../fonts/Nunito-Light.ttf"

const GlobalStyles = createGlobalStyle`
    ${normalize}

    @font-face {
        font-family: 'Nunito';
        font-weight: 700;
        src: url(${NunitoBold}) format('truetype'),
    }

    @font-face {
        font-family: 'Nunito';
        font-weight: 600;
        src: url(${NunitoSemiBold}) format('truetype');
    }

    @font-face {
        font-family: 'Nunito';
        font-weight: 500;
        src: url(${NunitoMedium}) format('truetype');
    }

    @font-face {
        font-family: 'Nunito';
        font-weight: 400;
        src: url(${NunitoRegular}) format('truetype');
    }

    @font-face {
        font-family: 'Nunito';
        font-weight: 300;
        src: url(${NunitoLight}) format('truetype');
    }

    body {
        font-family: 'Nunito', sans-serif;
    }

    p,h1,h2,h3,h4,h5,h6 {
        margin-top: 0;
    }
`;

export default GlobalStyles;