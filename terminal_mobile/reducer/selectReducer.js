export default (state={},action)=>{
  switch(action.type){
    case 'SELECT_IMAGES':{
      return {
        ...state,
        imageUri:action.imageUri,
        width:action.width,
        height:action.height,
      }
    }
    default: {
      return state
    }
  }
}
