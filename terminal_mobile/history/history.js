import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, StyleSheet,Platform, Text} from 'react-native';
import {Container,Header,Left,Body,Right,Title,Icon,Button} from 'native-base';
import {getUserHistory, signOut} from '../actions/historyAction';
import HistoryList  from './historyList';

const Empty = () => (
  <View style={styles.empty}>
    <Text>暂无记录</Text>
  </View>
);

class Person extends React.Component{
  
  componentDidMount(){
    this.props.getUserHistory()
  }
  
  render(){
    const {length, signOut} = this.props;
    return(
      <Container>
        <Header style={styles.header}>
          {Platform.OS === 'ios' ? <Left/> : <View/>}
          <Body style={Platform.OS === 'android' ? styles.androidHead : {}}>
          <Title>历史日志</Title>
          </Body>
          <Right>
            <Button
              title={''}
              transparent
              onPress={signOut}
            >
              <Icon style={styles.personalIcon} name={'ios-log-out'}/>
            </Button>
          </Right>
        </Header>
        {length !== 0 ?
          <HistoryList/> :
          <Empty/>
        }
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    marginBottom:10
  },
  androidHead:{
    marginLeft:'10%'
  },
  personalIcon:{
    color:Platform.OS === 'ios' ? '#282828' : '#fff'
  },
  empty:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});

Person.propTypes = {
  //history:PropTypes.array,
  length:PropTypes.number,
  getUserHistory:PropTypes.func,
  signOut:PropTypes.func,
};

const mapStateToProps = (state) => ({
  //index:state.nav.routes[1].index,
  length:state.historyReducer.history.length,
});

const mapDispatchToProps = dispatch => ({
  getUserHistory:()=>dispatch(getUserHistory()),
  signOut: ()=> dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Person)

