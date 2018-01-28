export default (state={},action)=>{
  switch(action.type){
    case 'USER_HISTORY':{
      return {
        ...state,
        history:action.history
      }
    }
    case 'TOGGLE_REFRESH':{
      return{
        ...state,
        refresh:action.refresh,
      }
    }
    case 'HANDLE_SKIP':{
      return{
        ...state,
        skip:action.skip === 0 ? 0 : state.skip+1,
      }
    }
    case 'STOP_LOAD_MORE':{
      return{
        ...state,
        stopLoadMore:action.stopLoadMore,
      }
    }
    default :{
      return state
    }
  }
}
