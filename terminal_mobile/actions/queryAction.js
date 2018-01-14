import host from '../../host';
import {handleNav} from './navAction';
import Realm from "realm";
import {UserInfoSchema} from '../realm/schema';

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
    (async ()=>{
      dispatch(handleSearchContent(query));
      dispatch(handleFetchStatus('fetching'));
      const check = ++i;
      const _query = query.replace(/(^\s*)|(\s*$)/g, '')
        .replace(/\s+/g, ' ').split(' ')
        .reduce((prev,curr)=>([...prev,`"${curr}"`]),[])
        .toString()
        .replace(/,/g,' ');
      const res = await fetch(`http://${host}:3001/query`,{
        method:'post',
        credentials:'include',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({query:_query})
      });
      const result = await res.json();
      if(check === i ) {
        //如果服务器session过期了，就重新提交一次用户名密码
        if(result[0]!=="queryNeedSession"){
          dispatch(fetchSuccess(result));
          dispatch(handleFetchStatus('success'))
        }else{
          const realm = await Realm.open({schema:[UserInfoSchema]});
          const userInfo = realm.objects('userInfo').filtered('id=1');
          
          if(!!realm.objects('userInfo').filtered('id=1')){
            const _res = await fetch(`http://${host}:3001/signIn`,{
              method:'post',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                userName:userInfo[0].username,
                passWord:userInfo[0].password,
              })
            });
            const _result = await _res.json();
            if(_result.level>=1 && _result.level <=5){
              //如果登陆成功，递归执行一次本函数
              dispatch(fetchDate(query))
            }else{
              dispatch(handleNav('SIGN_IN'))
            }
          }else{
            dispatch(handleNav('SIGN_IN'))
          }
        }
      }

    })().catch(()=>dispatch(handleFetchStatus('error')));



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
