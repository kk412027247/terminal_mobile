import host from '../../host';
import realm from '../realm/schema';
import {handleNav} from '../actions/navAction';
import {Toast} from 'native-base';
import {Alert} from 'react-native';

const handleUserHistory = (history) =>({
  type:'USER_HISTORY',
  history,
});

const toggleRefresh = (bool) => ({
  type:'TOGGLE_REFRESH',
  refresh:bool,
});

const handleSkip = (skip) => ({
  type:'HANDLE_SKIP',
  skip,
});

const stopLoadMore = (bool=false) => ({
  type:'STOP_LOAD_MORE',
  stopLoadMore:bool
});

export const getUserHistory = (loadMore=false)=>(
  (dispatch, getState)=>{
    if(!loadMore){
      dispatch(stopLoadMore(false));
      dispatch(handleSkip(0));
    }
    if(getState().historyReducer.stopLoadMore && loadMore) {
      return
    }
    (async()=>{
      if(!loadMore) {
        await dispatch(toggleRefresh(true));
        await dispatch(stopLoadMore(false))
      }
      if(loadMore) await dispatch(handleSkip());
      const skip = getState().historyReducer.skip;
      const res = await fetch(`http://${host}:3001/getUserHistory?skip=${skip}`);
      const result = await res.json();
      if(!!result.history){
        const history = skip === 0 ? result.history : [...getState().historyReducer.history, ...result.history] ;
        dispatch(toggleRefresh(false));
        dispatch(handleUserHistory(history));
        if(result.history.length === 0){dispatch(stopLoadMore(true))}
      }
    })();
  }
);

export const signOut = () =>(
  dispatch=>{
    Alert.alert(
      '用户: '+realm.objects('userInfo')[0].username,
      '现在需要退出账号吗',
      [
        {text:'取消',style:'cancel'},
        {text:'退出账号', onPress:()=>{
          fetch(`http://${host}:3001/signOut`)
            .then(res=>res.json())
            .then(()=>{
              realm.write(()=>realm.deleteAll());
              dispatch(handleNav('SIGN_IN'));
              Toast.show({
                text:'已退出',
                position:'top',
                type:'success',
                duration:1000,
                buttonText:'取消'
              })
            }).catch(err=>{
              console.log(err);
              Toast.show({
              text:JSON.stringify(err),
              position:'top',
              type:'warning',
              duration:4000,
              buttonText:'取消'
              })
            });
        }}
      ],
      { cancelable: false }
    )
  }
);

