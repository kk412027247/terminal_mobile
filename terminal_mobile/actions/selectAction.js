export const selectImages = (images, current) =>({
  type:'SELECT_IMAGES',
  imageUri:current.uri,
  width:current.width,
  height:current.height,
});
