export const selectImages = (images, current) =>({
  type:'SELECT_IMAGES',
  imageUri:images.length === 0 ? '' :current.uri,
  width:current.width,
  height:current.height,
});
