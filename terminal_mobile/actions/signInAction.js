import host from '../../host';
import {handleNav} from './navAction';
import {Toast} from 'native-base';
import realm from '../realm/schema';

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
    })().catch((err)=>Toast.show({text:JSON(err)}));
  }
);

