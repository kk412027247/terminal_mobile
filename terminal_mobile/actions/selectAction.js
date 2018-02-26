import host from "../../host";
import ImagePicker from 'react-native-image-picker';
import {Keyboard} from "react-native";



export const selectImages = (images, current) =>({
  type:'SELECT_IMAGES',
  imageUri:images.length === 0 ? '' :current.uri,
  width:current.width,
  height:current.height,
});


export const handleImage = (doc) =>({
  type:'HANDLE_IMAGE',
  width:doc.imageWidth ? Number(doc.imageWidth) : 1,
  height:doc.imageHeight ? Number(doc.imageHeight) : 1,
  imageUri:doc.imagePath ? `http://${host}:3001`+doc.imagePath.replace(/public/,'') : '',
});



export const pickImage = ()=>{
  Keyboard.dismiss();
  return dispatch=>{
    ImagePicker.launchImageLibrary({}, (response)  => {
      if(response.uri){
        dispatch({
          type:'SELECT_IMAGES',
          imageUri:response.uri,
          width:response.width,
          height:response.height,
        })
      }
    });
  }
};

export const removeImage = ()=>{
  Keyboard.dismiss();
  return {
    type:'SELECT_IMAGES',
    imageUri:'',
    width:1,
    height:1,
}};

