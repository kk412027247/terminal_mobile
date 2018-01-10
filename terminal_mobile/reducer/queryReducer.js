export default (state={}, action)=>{
  switch(action.type){
    case 'FETCH_SUCCESS':{
      return{
        ...state,
        result:action.result
      };
    }
    case 'HANDLE_SNACKBAR':{
      return{
        ...state,
        toastMessage:action.toastMessage,
      }
    }
    case 'HANDLE_BARCODE':{
      return{
        ...state,
        barcode:action.barcode,
      }
    }
    default:{
      return state
    }
  }
}
