import host from '../../host';

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
