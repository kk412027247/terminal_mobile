import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, StyleSheet,Platform,Dimensions} from 'react-native';
import {Container,Header,Left,Body,Right,Title,Content,Icon,Button} from 'native-base';
import {getUserHistory} from '../actions/personAction';
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
        <Content padder>
          <HistoryList/>
        </Content>
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
  right:{
    //width:100,
    width:Dimensions.get('window').width/3.5,
    backgroundColor:'#c35ccc'
  },
  saveTitle:{
    fontWeight:'bold',
    color:'#43a047'
  },
  saveIcon:{
    color:'#43a047'
  },
  unSaveTitle:{
    fontWeight:'bold',
    color:'#ffb300',
  } ,
  unSaveIcon:{
    color:'#ffb300'
  },
  updateButton:{
    height:15,
    marginRight:0
  },
  pageButton:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:20 ,
    marginBottom:20,
  },
  personalIcon:{
    color: Platform.OS === 'ios' ? '#3f3f3f' : '#f2f2f2'
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

