export default (state={},action)=>{
  switch(action.type){
    case 'USERNAME':{
      return{
        ...state,
        username:action.username,
      }
    }
    case'PASSWORD': {
      return{
        ...state,
        password:action.password,
      }
    }
    default:{
      return state;

    }
  }
}
