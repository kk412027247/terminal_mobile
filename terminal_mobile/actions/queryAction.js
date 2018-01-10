import host from '../../host'

const fetchSuccess = (result)=>({
  type: 'FETCH_SUCCESS',
  result,
});

let i =0;
export const fetchDate = (query)=>(
  dispatch=>{
    const check = ++i;
    const _query = query.replace(/(^\s*)|(\s*$)/g, '')
      .replace(/\s+/g, ' ').split(' ')
      .reduce((prev,curr)=>([...prev,`"${curr}"`]),[])
      .toString()
      .replace(/,/g,' ');
    fetch(`http://${host}:3001/query`,{
    method:'post',
    //credentials:'include',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({query:_query})
    }).then(res=>res.json())
      .then(result=>{
        if(check === i) dispatch(fetchSuccess(result))
      })
  }
);

const handleBarcode = (barcode) =>({
  type:'HANDLE_BARCODE',
  barcode,
});

export const scanBarcode = (barcode) =>(
  (dispatch, getState)=>{

  }
);
