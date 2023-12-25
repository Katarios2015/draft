import {SCALE_STEP, SCALE_MAX, SCALE_MIN} from './const.js';

const uploadForm = document.querySelector('.img-upload__form');
let renderedScaleCount = SCALE_MAX;

const smallerBtn = uploadForm.querySelector('.scale__control--smaller');
const biggerBtn = uploadForm.querySelector('.scale__control--bigger');
const controlInput = uploadForm.querySelector('.scale__control--value');
controlInput.value = `${renderedScaleCount}%`;
const photoPreview = uploadForm.querySelector('.img-upload__preview');
const imgPreview = photoPreview.firstElementChild;

const changePhotoSize = () => {
  controlInput.value = `${renderedScaleCount}%`;
  imgPreview.style.transform = `scale(${Number(parseInt (controlInput.value, 10) / 100)})`;
};

const onSmallerBtnClick = () => {
  renderedScaleCount -= SCALE_STEP;
  changePhotoSize();
  if(renderedScaleCount <= SCALE_MIN) {
    renderedScaleCount = SCALE_MIN;
    changePhotoSize();
  }
};

const onBiggerBtnClick = () => {
  renderedScaleCount += SCALE_STEP;
  changePhotoSize();
  if(renderedScaleCount >= SCALE_MAX) {
    renderedScaleCount = SCALE_MAX;
    changePhotoSize();
  }
};

smallerBtn.addEventListener('click', onSmallerBtnClick);
biggerBtn.addEventListener('click', onBiggerBtnClick);

function removeSizeBtnLicteners () {
  smallerBtn.removeEventListener('click', onSmallerBtnClick);
  biggerBtn.removeEventListener('click', onBiggerBtnClick);
}

export {removeSizeBtnLicteners, imgPreview, uploadForm};
