import {NavigationActions} from 'react-navigation';
import AppWithNavigator from '../navigator/navigator';

//这里的路由路径，只能默认渲染第一级
const initialState = AppWithNavigator.router.getStateForAction(AppWithNavigator.router.getActionForPathAndParams('signIn'));

export default (state=initialState ,action)=>{
  switch(action.type){
    case 'QUERY':{
      return AppWithNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName:'query'}),
        state
      );
    }
    case 'ADD':{
      return AppWithNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName:'add'}),
        state
      );
    }
    case 'SIGN_IN':{
      return AppWithNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName:'signIn'}),
        state
      )
    }
    case 'GO_BACK':{
      return AppWithNavigator.router.getStateForAction(
        NavigationActions.back(),
        state,
      )
    }
    case 'OPEN_CAMERA':{
      return AppWithNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName:'camera'}),
        state
      )
    }
    case 'TO_MAIN':{
      return AppWithNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName:'main'}),
        state
      )
    }
    case 'TO_SELECT':{
      return AppWithNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName:'select'}),
        state
      )
    }
    default:{
      return AppWithNavigator.router.getStateForAction(action, state)
    }
  }
}
