import host from '../../host'


export const handleBrand = (text) => ({
  type:'HANDLE_BRAND',
  brand:text,
});

export const handleModel = (text) => ({
  type:'HANDLE_MODEL',
  model:text,
});

export const handleTAC = (text) => ({
  type:'HANDLE_TAC',
  TAC:text,
});

export const createTAC = ()=>(
  (dispatch,getState)=>{
    const query = {
      '品牌1':getState().addReducer.brand,
      '型号1':getState().addReducer.model,
      'TAC':getState().addReducer.TAC,
    };

    fetch(`http://${host}:3001/createTac`,{
      method:'post',
      headers:{'Content-type':'application/json'},
      //credentials:'include',
      body:JSON.stringify({docs:[query]})
    }).then(res=>res.json())
      .then(result=>{console.log(result)})
  }
);


