import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, StyleSheet,Platform} from 'react-native';
import {Container,Header,Left,Body,Right,Title,Icon,Button} from 'native-base';
import {getUserHistory} from '../actions/historyAction';
import HistoryList  from './historyList';

class Person extends React.Component{
  
  componentDidMount(){
    this.props.getUserHistory()
  }

  render(){
    return(
      <Container>
        <Header>
          {Platform.OS === 'ios' ? <Left/> : <View/>}
          <Body style={Platform.OS === 'android' ? styles.androidHead : {}}>
          <Title>个人中心</Title>
          </Body>
          <Right>
            <Button
              title={''}
              onPress={()=>{}}
              transparent
            >
              <Icon style={styles.personalIcon} name={'ios-person'}/>
            </Button>
          </Right>
        </Header>
        <HistoryList/>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
  card:{
    marginBottom:10,
    flexDirection:'row'
  },
  androidHead:{
    marginLeft:'10%'
  },
  left:{
    flex:1
  },
  personalIcon:{
    color:'#282828'
  }
});

Person.propTypes = {
  history:PropTypes.array,
  index:PropTypes.number,
  getUserHistory:PropTypes.func,
};

const mapStateToProps = (state) => ({
  index:state.nav.routes[1].index,

});

const mapDispatchToProps = dispatch => ({
  getUserHistory:()=>dispatch(getUserHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(Person)

