import {NavigationActions} from 'react-navigation';
//import {AppWithNavigator} from '../../App';
import AppWithNavigator from '../navigator/navigator'
//不需要重新默认值，如果加了的话，第一页会重复渲染，产生一个重复的历史页
//const initialState = AppWithNavigator.router.getStateForAction(AppWithNavigator.router.getActionForPathAndParams('query'));

export default (state ,action)=>{
  switch(action.type){
    case 'QUERY':{
      if(state.routes[1].index === 0){
        return state
      }else{
        return AppWithNavigator.router.getStateForAction(
          NavigationActions.navigate({routeName:'query'}),
          state
        );
      }
    }
    case 'ADD':{
      if(state.routes[1].index === 1){
        return state
      } else {
        return AppWithNavigator.router.getStateForAction(
          NavigationActions.navigate({routeName:'add'}),
          state
        );
      }
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
    default:{
      return AppWithNavigator.router.getStateForAction(action, state)
    }
  }
}
