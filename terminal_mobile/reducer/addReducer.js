export default (state={},action)=>{
  switch(action.type){
    case 'HANDLE_BRAND':{
      return{
        ...state,
        brand:action.brand,
      }
    }
    case 'HANDLE_MODEL':{
      return{
        ...state,
        model:action.model,
      }
    }
    case 'HANDLE_TAC':{
      return{
        ...state,
        TAC:action.TAC
      }
    }
    case 'TOGGLE_STATUS':{
      return{
        ...state,
        status:action.status
      }
    }
    case 'TOGGLE_FETCH' :{
      return{
        ...state,
        fetching:action.fetching,
      }
    }
    default :{
      return state
    }
  }
};
