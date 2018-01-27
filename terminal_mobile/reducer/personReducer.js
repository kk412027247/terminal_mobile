export default (state={},action)=>{
  switch(action.type){
    case 'USER_HISTORY':{
      return {
        ...state,
        history:action.history
      }
    }
    default :{
      return state
    }
  }
}
