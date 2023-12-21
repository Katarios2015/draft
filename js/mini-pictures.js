const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();


const createGallery = (photosArray) => {
  photosArray.slice().forEach(({id, url, likes, comments})=> {
    pictureTemplate.querySelector('.picture__img').src = url;
    pictureTemplate.querySelector('.picture__likes').textContent = likes;
    pictureTemplate.querySelector('.picture__comments').textContent = comments.length;
    pictureTemplate.dataset.id = id;
    const miniaturePicture = pictureTemplate.cloneNode(true);
    picturesFragment.appendChild(miniaturePicture);
  });

  picturesContainer.appendChild(picturesFragment);

};

export {createGallery, picturesContainer};
