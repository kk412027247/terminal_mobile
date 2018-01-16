import host from '../../host';
import {Toast} from 'native-base';
import {handleNav} from "./navAction";
import {UserInfoSchema} from '../realm/schema';
import Realm from "realm";

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
      if(!getState().addReducer.brand || !getState().addReducer.model || !getState().addReducer.TAC){
        throw '提交失败，请完善录入信息'
      }
      // const query = {
      //   '品牌1':getState().addReducer.brand,
      //   '型号1':getState().addReducer.model,
      //   'TAC':getState().addReducer.TAC,
      // };                     

      const data = new FormData();
      data.append('品牌1',getState().addReducer.brand);
      data.append('型号1',getState().addReducer.model);
      data.append('TAC',getState().addReducer.TAC);

      if(getState().selectReducer.imageUri !== ''){
        data.append('tacWithImage',{
          uri:getState().selectReducer.imageUri,
          type:'photo.type',
          name:'image',
        })
      }
      const res = await fetch(`http://${host}:3001/createTacWithImage`,{
        method:'post',
        credentials:'include',
        body:data,
      });
      const result = await res.json();
      if(result[0]!=='createNeedSession'){
         await Toast.show({
          text:'提交成功',
          position:'top',
          type:'success',
          duration:3000,
          buttonText:'确认',
        })
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
            dispatch(createTAC())
          }else{
            dispatch(handleNav('SIGN_IN'))
          }
        }else{
          dispatch(handleNav('SIGN_IN'))
        }
      }
    })().catch((err)=>{
      Toast.show({
        text:err,
        position:'top',
        type:'warning',
        duration:2000
      })
    });

  }
);


