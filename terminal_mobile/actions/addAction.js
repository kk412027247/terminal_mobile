import host from '../../host';
import {Alert, Keyboard} from 'react-native';
import {Toast} from 'native-base';
import {handleNav} from "./navAction";
import realm from '../realm/schema';
import {handleImage} from './selectAction';
import {handleSearchContent} from './queryAction' ;
import {getUserHistory} from "./historyAction";
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

export const toggleStatus = (status) =>({
  type:'TOGGLE_STATUS',
  status,
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
      let url;
      switch(getState().addReducer.status){
        case 'add':
          url=`http://${host}:3001/createTacWithImage`;
          break;
        case 'update':
          url=`http://${host}:3001/updateTacWithImage`;
          break;
        case 'delete':
          url = `http://${host}:3001/deleteTacWithImage`;
          break;
        default:
          url=`http://${host}:3001/createTacWithImage`;

      }
      //console.log(data);
      const res = await fetch(url,{
        method:'post',
        credentials:'include',
        body:data,
      });
      const result = await res.json();
      if(result[0]!=='createNeedSession'){
        let message ;
        switch(result){
          case 'saved':
            message = {text:'保存成功', type:'success'};
            break;
          case 'cache':
            message = {text:'该数据已存在，缓存至历史日志，请在PC端修改', type:'warning'};
            break;
          case 'exist':
            message = {text:'保存失败，重复保存', type:'danger'};
            break;
          case 'updated':
            message = {text:'修改成功', type:'success'};
            break;
          case 'delete':
            message={text:'删除成功', type:'success'};
            break;
          default:
            message = {text: JSON.stringify(result), type:'danger'}
        }
        dispatch(getUserHistory());
        Toast.show({
          text: message.text,
          position:'top',
          type: message.type,
          duration:5000,
          buttonText:'确认',
        });
        dispatch(clean());
        dispatch(handleNav('HISTORY'));
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
    dispatch(handleImage({}));
    dispatch(handleSearchContent(''));
    Keyboard.dismiss();
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
          Alert.alert('提示','该信息已缓存',[
            {text:'取消', onPress:()=>{
              dispatch(toggleStatus('add'));
              dispatch(handleTAC(''));
            }},
            {text:'查看',onPress:()=>{
                dispatch(toggleStatus('update'));
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
