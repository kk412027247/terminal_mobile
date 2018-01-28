import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Image ,TouchableOpacity, Dimensions} from 'react-native';
import {Right, Card, CardItem, Icon, Button} from 'native-base';
import {handleNav} from '../actions/navAction' ;
import {handleImage} from '../actions/selectAction';
import {handleBrand, handleModel, handleTAC, toggleStatus} from '../actions/addAction';


class HistoryItem extends React.Component{
  render(){
    const {status, brand, model, TAC, uri, width, height, openImage, updateHistory} = this.props;
    const imageStyle = {
      width: Dimensions.get('window').height / 3.5 * width / height, 
      height: Dimensions.get('window').height / 3.5
    };
    const titleStyle = status==='saved' ? styles.saveTitle : styles.unSaveTitle ;
    const image = {
      imageWidth: width,
      imageHeight: height,
      imagePath: uri.replace(/[\S]+3001/,'')
    };
    return(
      <Card style={styles.card}>
        <View style={styles.left}>
          <CardItem header>
            <Icon
              style={status==='saved' ? styles.saveIcon : styles.unSaveIcon}
              name={status==='saved' ? 'ios-cloud-done' : 'ios-cloud-done'}
            />
            <Text style={titleStyle}>
              {status==='saved'?'已保存':'未保存'}
            </Text>
            <Right>
              <Button
                dark
                style={styles.updateButton}
                transparent
                onPress={updateHistory.bind(null,TAC,'ADD',brand,model,image)}
                title={''}
              >
                <Icon name={'md-create'}/>
              </Button>
            </Right>
          </CardItem>
          <CardItem>
            <Text style={titleStyle}>厂商: </Text>
            <Text>{brand}</Text>
          </CardItem>
          <CardItem>
            <Text style={titleStyle}>型号: </Text>
            <Text>{model}</Text>
          </CardItem>
          <CardItem>
            <Text style={titleStyle}>TAC: </Text>
            <Text>{TAC}</Text>
          </CardItem>
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            onPress={openImage.bind(null,image,'SHOW_IMAGE')}
          >
            <Image
              style={imageStyle}
              source={{uri}}
            />
          </TouchableOpacity>
        </View>
      </Card>
    )
  }
}

HistoryItem.propTypes = {
  status: PropTypes.string,
  brand: PropTypes.string,
  model: PropTypes.string,
  TAC: PropTypes.number,
  uri: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  openImage: PropTypes.func,
  updateHistory: PropTypes.func,
};


const styles = StyleSheet.create({
  left:{
    flex:1
  },
  right:{
    width:Dimensions.get('window').width/3.5,
  },
  card:{
    marginBottom:10,
    flexDirection:'row',
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

const mapStateToProps = (state,ownProp) => ({
  status: ownProp.status,
  brand: ownProp.brand,
  model: ownProp.model,
  TAC: ownProp.TAC,
  uri: ownProp.uri,
  width: ownProp.width,
  height: ownProp.height,
});

const mapDispatchToProps = dispatch =>({
  openImage: (image,nav) => {
    dispatch(handleImage(image));
    dispatch(handleNav(nav));
  },
  updateHistory: (TAC,nav,brand,model,image)=> {
    dispatch(handleTAC(TAC.toString()));
    dispatch(handleNav(nav));
    dispatch(handleBrand(brand));
    dispatch(handleModel(model));
    dispatch(toggleStatus('update'));
    dispatch(handleImage(image))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryItem)
