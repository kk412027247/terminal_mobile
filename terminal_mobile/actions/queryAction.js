import host from '../../host';

const fetchSuccess = (result)=>({
  type: 'FETCH_SUCCESS',
  result,
});

const handleSearchContent = (content)=>({
  type:'SEARCH_CONTENT',
  content:content.replace(/(^\s*)|(\s*$)/g, '')
});

let i =0;
export const fetchDate = (query)=>(
  dispatch=>{
    dispatch(handleSearchContent(query));
    dispatch(handleFetchStatus('fetching'));
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
        if(check === i) {
          dispatch(fetchSuccess(result));
          dispatch(handleFetchStatus('success'))
        }
      })
      .catch(()=>dispatch(handleFetchStatus('error')))
  }
);

export const barCodeRead = (barcode) =>({
  type:'HANDLE_BARCODE',
  barcode:barcode.substring(0,8),
});


export const handleFetchStatus = (status) =>({
  type:'FETCH_STATUS',
  status,
});

//
// export const barCodeRead = (barcode) =>(
//   (dispatch, getState)=>{
//     dispatch(handleBarcode(barcode));
//     console.log(barcode)
//
//
//
//
//   }
// );
