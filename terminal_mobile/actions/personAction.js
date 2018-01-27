import host from '../../host';

const handleUserHistory = (history) =>({
  type:'USER_HISTORY',
  history,
});

export const getUserHistory = ()=>(
  dispatch=>{
    fetch(`http://${host}:3001/getUserHistory`)
      .then(res=>res.json())
      .then(result=>{
        if(!!result.history){
          dispatch(handleUserHistory(result.history))
        }
      })
  }
);
