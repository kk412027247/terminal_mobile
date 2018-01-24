import host from '../../host';
import {handleNav} from './navAction';
import {Toast} from 'native-base';
import realm from '../realm/schema';
import {createTAC} from "./addAction";

export const handleUsername = (username) =>({
  type:'USERNAME',
  username,
});

export const handlePassword = (password) => ({
  type:'PASSWORD',
  password,
});

export const handleSignIn =(info)=>(
  (dispatch,getState)=>{
    const _username = getState().signInReducer.username;
    const _password = getState().signInReducer.password;
    (async ()=>{
      if(!!info){
        this.info=info;
      }else{
        this.info = {
          userName:_username,
          passWord:_password
        }
      }
      const res = await fetch(`http://${host}:3001/signIn`,{
        method:'post',
        credentials:'include',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(this.info)
      });
      const result = await res.json();
      if(result.level>=1 && result.level <=5){
        dispatch(handleNav('TO_MAIN'));
        if(!!_username && !!_password){
          realm.write(()=>{
            realm.create('userInfo', {
              id:1,
              username:_username,
              password: _password,
            },true)
          });
        }

      }else{
        Toast.show({
          text:'密码错误',
          position:'top',
          type:'waring',
          duration:3000,
          buttonText:'取消',
        })
      }
    })().catch(()=>Toast.show({
      text:'服务器链接失败',
      position:'top',
      type:'danger',
      duration:3000,
      buttonText:'取消'
    }));
  }
);


export const reSign = ()=>(
  async (dispatch) => {
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
);
