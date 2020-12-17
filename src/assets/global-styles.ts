import { injectGlobal } from '@emotion/css';
import { robotoFont } from './fonts/roboto/roboto-font';

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ${robotoFont}
`;
