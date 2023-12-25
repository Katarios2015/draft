import {imgPreview, uploadForm} from './resize-photo.js';
import {getEffectSelector} from './util.js';
import {Effects, sliderOptionsObjectChromeSepia, sliderOptionsObjectMarvinDefault} from './const.js';


const effectsRadioBtnList = uploadForm.querySelector('.effects__list');
const effectLevelInput = uploadForm.querySelector('.effect-level__value');
effectLevelInput.value = 100;
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const selectorImg = imgPreview.classList;

const effectRadioBtns = uploadForm.querySelectorAll('.effects__radio');

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});


const getUpdateSliderOptions = (effect, sliderElement) => {
  switch (effect) {
    case Effects.chrome: {
      return sliderElement.noUiSlider.updateOptions(sliderOptionsObjectChromeSepia);
    }
    case Effects.sepia: {
      return sliderElement.noUiSlider.updateOptions(sliderOptionsObjectChromeSepia);
    }
    case Effects.marvin: {
      return sliderElement.noUiSlider.updateOptions(sliderOptionsObjectMarvinDefault);
    }
    case Effects.phobos: {
      return sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1,
      });
    }
    case Effects.heat: {
      return sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1,
      });
    }
    default:
      return sliderElement.noUiSlider.updateOptions(sliderOptionsObjectMarvinDefault);
  }
};

const resetFilter = () => {
  imgPreview.style.removeProperty('filter');
  sliderContainer.classList.add('hidden');
  imgPreview.classList.replace(selectorImg, 'effects__preview--none');
};

effectSlider.noUiSlider.on('update', () => {
  effectLevelInput.value = effectSlider.noUiSlider.get();
  effectRadioBtns.forEach((item)=> {
    if(item.checked){
      if(item.id !== 'effect-none') {
        sliderContainer.classList.remove('hidden');
      }
      switch (item.id){
        case Effects.chrome: {
          const styleFilter = imgPreview.style.filter = `grayscale(${effectLevelInput.value})`;
          return styleFilter;
        }
        case Effects.sepia: {
          const styleFilter = imgPreview.style.filter = `sepia(${effectLevelInput.value})`;

          return styleFilter;
        }
        case Effects.marvin: {
          const styleFilter = imgPreview.style.filter = `invert(${effectLevelInput.value}%)`;

          return styleFilter;
        }
        case Effects.phobos: {
          const styleFilter = imgPreview.style.filter = `blur(${effectLevelInput.value}px)`;

          return styleFilter;
        }
        case Effects.heat: {
          const styleFilter = imgPreview.style.filter = `brightness(${effectLevelInput.value})`;

          return styleFilter;
        }
        default: {
          resetFilter();
        }
      }
    }

  });
});

const onEffectRadioBtnClick = (evt) => {
  const currentRadioBtn = evt.target.closest('.effects__radio');
  if(currentRadioBtn){
    const effectBtnId = currentRadioBtn.id;
    imgPreview.classList.replace(selectorImg, getEffectSelector(effectBtnId));
    getUpdateSliderOptions(effectBtnId, effectSlider);
  }
};


export {onEffectRadioBtnClick, effectsRadioBtnList, resetFilter};

