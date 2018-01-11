import {NavigationActions} from 'react-navigation';
import {AppNavigator} from '../../App';
//不需要重新默认值，如果加了的话，第一页会重复渲染，产生一个重复的历史页
//const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('query'));

export default (state ,action)=>{
  switch(action.type){
    case 'QUERY':{
      if(state.index === 0){
        return state
      }else{
        return AppNavigator.router.getStateForAction(
          NavigationActions.navigate({routeName:'query'}),
          state
        );
      }
    }
    case 'ADD':{
      if(state.index === 1){
        return state
      } else {
        return AppNavigator.router.getStateForAction(
          NavigationActions.navigate({routeName:'add'}),
          state
        );
      }
    }
    case 'GO_BACK':{
      return AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state,
      )
    }
    case 'OPEN_CAMERA':{
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName:'camera'}),
        state
      )
    }
    default:{
      return AppNavigator.router.getStateForAction(action, state)
    }
  }
}
