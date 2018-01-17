import {TabNavigator, StackNavigator} from 'react-navigation';
import Add from '../add/add';
import Select from '../select/select';
import SignIn from '../signInPage/signIn';
import FooterTabBar from '../footer/footerTabBar';
import Query from '../query/query';
import Camera from '../camera/camera';
import ShowImage from '../showImage/showImage';
import Person from '../person/person';



const Main = TabNavigator({
  query: {screen: Query},
  add: {screen: Add},
  person:{screen: Person},
},{
  tabBarPosition:'bottom',
  tabBarComponent: FooterTabBar,
});

const AppWithNavigator = StackNavigator({
  signIn: {screen: SignIn},
  main: {screen: Main},
  select:{screen: Select},
  camera:{screen: Camera},
  showImage:{screen: ShowImage}
},{
  headerMode:'none',
  //mode: 'modal',
  navigationOptions: {
    //阻止手势返回
    gesturesEnabled: false,
  },
});




export default AppWithNavigator;
