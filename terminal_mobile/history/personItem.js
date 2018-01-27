import React from 'react';
import {StyleSheet, Text,View} from 'react-native';
import {connect} from 'react-redux';
import {Right, Card, CardItem, Icon, Button} from 'native-base';

class PersonItem extends React.Component{
  render(){
    const {} = this.props;
    return(
      <Card style={styles.card}>
        <View style={styles.left}>
          <CardItem header>
            <Icon style={styles.saveIcon} name={'ios-cloud-done'}/>
            <Text style={styles.saveTitle}>已保存</Text>
            <Right>
              <Button
                dark
                style={styles.updateButton}
                transparent
                onPress={()=>{}}
                title={''}
              >
                <Icon name={'md-create'}/>
              </Button>
            </Right>
          </CardItem>
          <CardItem>
            <Text style={styles.saveTitle}>厂商: </Text>
            <Text>三星</Text>
          </CardItem>
          <CardItem>
            <Text style={styles.saveTitle}>型号: </Text>
            <Text>galaxy note 8</Text>
          </CardItem>
          <CardItem>
            <Text style={styles.saveTitle}>TAC: </Text>
            <Text>12345678</Text>
          </CardItem>
        </View>
        <View style={styles.right}>
          <Text>123</Text>
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  left:{
    flex:1
  },
  right:{
    width:100,
    backgroundColor:'#c35ccc'
  },
  card:{
    marginBottom:10,
    flexDirection:'row'
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
  }
});



export default connect()(PersonItem)

