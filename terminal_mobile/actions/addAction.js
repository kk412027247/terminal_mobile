import host from '../../host';
import {Toast} from 'native-base';
import {handleNav} from "./navAction";
import {handleFetchStatus} from "./queryAction";

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
    (async ()=>{
      const query = {
        '品牌1':getState().addReducer.brand,
        '型号1':getState().addReducer.model,
        'TAC':getState().addReducer.TAC,
      };
      const res = await fetch(`http://${host}:3001/createTac`,{
        method:'post',
        headers:{'Content-type':'application/json'},
        credentials:'include',
        body:JSON.stringify({docs:[query]})
      });
      const result = await res.json();
      if(result[0]!=='createNeedSession'){
         Toast.show({
          text:'提交成功',
          position:'top',
          type:'success',
          duration:3000,
          buttonText:'确认',
        })
      }else{
        const userInfo = await AsyncStorage.multiGet(['username','password']);
        if(!!userInfo[0][1] && !!userInfo[1][1]){
          const _res = await fetch(`http://${host}:3001/signIn`,{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userName:userInfo[0][1],passWord:userInfo[1][1]})
          });
          const _result = await _res.json();
          if(_result.level>=1 && _result.level <=5){
            //如果登陆成功，递归执行一次本函数
            dispatch(createTAC())
          }else{
            dispatch(handleNav('SIGN_IN'))
          }
        }else{
          dispatch(handleNav('SIGN_IN'))
        }
      }
    })().catch((err)=>Toast.show({text:JSON(err)}));

  }
);


