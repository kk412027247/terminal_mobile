import host from "../../host";

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
