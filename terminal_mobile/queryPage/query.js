import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Container, Header, Item, Input, Content, Icon} from 'native-base';
import Scan from './scan';
import Result from './result';
import {fetchDate} from '../actions/queryAction';


const Query = ({fetchDate, showResult, navigation})=>(
  <Container>
    <Header searchBar rounded>
      <Item>
        <Input
          placeholder={' 搜索 :  TAC、厂商、品牌、型号'}
          onChangeText={fetchDate}
        />
        <Icon name={'ios-search'}/>
      </Item>
    </Header>
    <Content  contentContainerStyle ={styles.content}>
      {showResult ? <Result/> : <Scan navigation={navigation}/>}
    </Content>
  </Container>
);


Query.propTypes = {
  fetchDate:PropTypes.func,
};


const styles = StyleSheet.create({
  content:{
    flex:1,
    alignItems:'center',
  }
});

const mapStateToProps = state =>({
  showResult: state.queryReducer.result.length !== 0,
});

const mapDispatchToProps = dispatch =>({
  fetchDate: query=> dispatch(fetchDate(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Query)



