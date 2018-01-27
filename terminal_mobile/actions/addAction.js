import host from '../../host';
import {Alert} from 'react-native';
import {Toast} from 'native-base';
import {handleNav} from "./navAction";
import realm from '../realm/schema';
import {handleImage} from './selectAction';
//import {reSign} from './signInAction'

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
  TAC:text.substring(0,8),
});

export const toggleStatus = (bool) =>({
  type:'TOGGLE_STATUS',
  status:bool?'update':'add'
});

export const createTAC = ()=>(
  (dispatch,getState)=>{
    (async ()=>{
      if(!getState().addReducer.brand || !getState().addReducer.model || getState().addReducer.TAC.length !== 8){
        throw '提交失败，请补充空缺'
      }
      const data = new FormData();
      data.append('brand',getState().addReducer.brand);
      data.append('model',getState().addReducer.model);
      data.append('TAC',getState().addReducer.TAC);

      if(getState().selectReducer.imageUri !== ''){
        const username = getState().signInReducer.username ?
          getState().signInReducer.username :
          realm.objects('userInfo')[0].username ?
          realm.objects('userInfo')[0].username :
          ''
        ;
        data.append('imageWidth',getState().selectReducer.width);
        data.append('imageHeight',getState().selectReducer.height);
        data.append('image',{
          uri:getState().selectReducer.imageUri,
          type: 'image/*',
          name: username + Date.now() + '.jpeg',
        })
      }
      const url = getState().addReducer.status === 'add' ?
        `http://${host}:3001/createTacWithImage` :
        `http://${host}:3001/updateTacWithImage`;

      const res = await fetch(url,{
        method:'post',
        credentials:'include',
        body:data,
      });
      const result = await res.json();
      //console.log(result);
      if(result[0]!=='createNeedSession'){
         await Toast.show({
          text:'提交成功',
          position:'top',
          type:'success',
          duration:3000,
          buttonText:'确认',
        })
      }else{
        //dispatch(reSign(createTAC()))
        const userInfo = realm.objects('userInfo').filtered('id=1');
        if(!!userInfo){
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
        text:JSON.stringify(err),
        position:'top',
        type:'warning',
        duration:4000,
        buttonText:'取消'
      })
    });

  }
);

export const clean = ()=> (
  dispatch =>{
    dispatch(handleBrand('')) ;
    dispatch(handleModel(''));
    dispatch(handleTAC(''));
    dispatch(handleImage({}))
  }
);

export const searchHistory = () => (
  (dispatch, getState)=>{
    (async ()=>{
      const res = await fetch(`http://${host}:3001/searchUserHistory`,{
        method:'post',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({TAC:Number(getState().addReducer.TAC)})
      });
      const result = await res.json();
      if(!!result){
        if(result[0]!=='queryNeedSession'){
          //console.log(result);
          Alert.alert('提示','该信息为今天录入／已经缓存',[
            {text:'取消', onPress:()=>{
              dispatch(toggleStatus(false));
              dispatch(handleTAC(''));
            }},
            {text:'查看',onPress:()=>{
                dispatch(toggleStatus(true));
                dispatch(handleBrand(result.history[0]['品牌1']));
                dispatch(handleModel(result.history[0]['型号1']));
                dispatch(handleImage(result.history[0]));
            }},
          ],{
            cancelable:false
          })
        }else{
          const userInfo = realm.objects('userInfo').filtered('id=1');
          if(!!userInfo){
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
              dispatch(searchHistory())
            }else{
              dispatch(handleNav('SIGN_IN'))
            }
          }else{
            dispatch(handleNav('SIGN_IN'))
          }
        }
      }
    })()
  }
);
