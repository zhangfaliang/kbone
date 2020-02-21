// import { getLocale } from 'umi/locale';
import { get } from 'lodash';
import Header from '../header20190531/game';
import GameHeader from '../header/game';
import Hainan from '../hainanHeader/game';
const choose = {
  oldHeader: props => {
    return <GameHeader {...props} />;
  },
  newHeader: props => {
    return <Header {...props} />;
  },
  hainanHeader: props => {
    return <Hainan {...props} />;
  },
};
export default function Header1(props) {
  const product = sessionStorage.getItem('product');
  const headerDIV =
    product === '2'
      ? choose[get(props, 'initConfig.nav')] && choose[get(props, 'initConfig.nav')](props)
      : choose[get(props, 'initConfig.nav', 'newHeader')](props);
  return <>{headerDIV}</>;
}
