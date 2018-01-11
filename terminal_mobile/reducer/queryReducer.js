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
    case 'FETCH_STATUS':{
      return{
        ...state,
        status:action.status,
      }
    }
    case 'SEARCH_CONTENT':{
      return{
        ...state,
        content:action.content
      }
    }
    default:{
      return state
    }
  }
}
