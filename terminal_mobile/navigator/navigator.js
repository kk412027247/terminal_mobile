import {TabNavigator, StackNavigator} from 'react-navigation';
import Add from '../addPage/add';
import Select from '../addPage/select';
import SignInPage from '../signInPage/signIn';
import FooterTabBar from '../footer/footerTabBar';
import Query from '../queryPage/query';
import Camera from '../queryPage/camera';

const QueryPage = StackNavigator({
  _query:{screen: Query},
  camera:{screen: Camera}
},{
  headerMode:'none',
  //mode:'modal',
});

const AddPage = StackNavigator({
  _add:{screen: Add},
  select:{screen: Select}
},{
  headerMode:'none',
});


const MainPage = TabNavigator({
  query: {screen: QueryPage},
  add: {screen: AddPage},
},{
  tabBarPosition:'bottom',
  tabBarComponent: FooterTabBar,
});

const AppWithNavigator = StackNavigator({
  signIn: {screen: SignInPage},
  main: {screen: MainPage}
},{
  headerMode:'none',
  //mode: 'modal',
  navigationOptions: {
    //阻止返回
    gesturesEnabled: false,
  },
});




export default AppWithNavigator;
