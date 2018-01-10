import {NavigationActions} from 'react-navigation';
import {AppNavigator} from '../../App';
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('query'));
export default (state=initialState, action)=>{
  switch(action.type){
    case 'query':{
      return AppNavigator.router.getStateForAction(NavigationActions({routeName:'query'}))
    }
    default:{
      return AppNavigator.router.getStateForAction(action, state)
    }
  }
}
