import React from 'react';
import {connect} from 'react-redux';
import {FlatList, View, Text} from 'react-native';
import HistoryItem from './historyItem';
import host from "../../host";

class History extends React.Component{
  state={refresh:false};
  render(){
    const {history} = this.props;
    return(
      <View>
        {
          history.length !== 0 ?
          <FlatList
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
            onRefresh={()=>console.log('refresh')}
            refreshing={this.state.refresh}
          /> :
          <Text>数据加载中……</Text>
        }
      </View>
    )
  }
}


const mapStateToProps = state =>({
  history:state.personReducer.history
});

export default connect(mapStateToProps)(History)
