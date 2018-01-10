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
    default :{
      return state
    }
  }
};
