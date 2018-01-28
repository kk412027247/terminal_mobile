import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import HistoryItem from './historyItem';
import host from "../../host";
import {getUserHistory} from "../actions/historyAction";

class HistoryList extends React.PureComponent{
  state={
    refresh:false,
    skip:0
  };

  footer = () => (
     <View style={styles.indicator}>
      <ActivityIndicator/>
    </View>
  );

  render(){
    const {history, refresh, getUserHistory, stopLoadMore} = this.props;
    return(
      <FlatList
        style={styles.padding}
        data={history}
        renderItem={({item})=>(
          <HistoryItem
            status={item.status}
            brand={item['品牌1']}
            model={item['型号1']}
            TAC={item.TAC}
            uri={item.imagePath ? `http://${host}:3001`+item.imagePath.replace(/public/,'') : ''}
            width={item.imageWidth ? Number(item.imageWidth) : 1}
            height={item.imageHeight ? Number(item.imageHeight) : 1}
          />)}
        keyExtractor={item => item.TAC}
        onRefresh={getUserHistory}
        refreshing={refresh}
        ListFooterComponent={!stopLoadMore ? this.footer : <View/>}
        onEndReached={getUserHistory.bind(null,true)}
        onEndReachedThreshold={0.5}
      />
    )
  }
}

const styles = StyleSheet.create({
  padding:{
    paddingHorizontal:'2%',
    paddingTop:10
  },
  indicator:{
    height:35
  }
});

HistoryList.propTypes = {
  history: PropTypes.array,
  getUserHistory: PropTypes.func,
  handleSkip: PropTypes.func,
  refresh: PropTypes.bool,
  stopLoadMore: PropTypes.bool,
};


const mapStateToProps = state =>({
  history:state.historyReducer.history,
  refresh:state.historyReducer.refresh,
  stopLoadMore:state.historyReducer.stopLoadMore
});

const mapDispatchToProps = dispatch => ({
  getUserHistory: (loadMore) => dispatch(getUserHistory(loadMore)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList)
