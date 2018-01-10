import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ScrollView,View, StyleSheet} from 'react-native';
import {Card,Text, CardItem, Icon} from 'native-base';


const CardList = (props) =>(
  <View>
    <CardItem>
      <Icon style={styles.icon} name={props.icon}/>
      <Text style={styles.title}>{props.field + ' :'+ '       '}</Text>
      <Text>{props.value}</Text>
    </CardItem>
  </View>
) ;
                        
const  Result = ({result})=>
  <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
    {result.map(info=>(
      <Card style={styles.card} key={info._id}>
        <CardList field={'厂家'} icon={'md-arrow-dropright'} value={info['厂商(中文)']} />
        <CardList field={'品牌'} icon={'md-arrow-dropright'} value={info['品牌(英文)']} />
        <CardList field={'型号'} icon={'md-arrow-dropright'} value={info['型号']} />
      </Card>
    ))}
  </ScrollView>

;

   



Result.propTypes = {
  result:PropTypes.array,
};







const styles = StyleSheet.create({
  scrollViewContainer:{
    alignItems:'center',
    justifyContent:'center',
  },
  title:{
    fontWeight:'bold',
  },
  scrollView:{
    width:'100%',
    //backgroundColor:'#c35ccc',

  },
  card:{
    width:'90%',
    marginTop:10,
  },
  icon:{
    color:'#7b1fa2'
  }
});

const mapStateToProps = state =>({
  result:state.queryReducer.result,
});


export default connect(mapStateToProps)(Result)

