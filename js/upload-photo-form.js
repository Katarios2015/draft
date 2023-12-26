import {pageBody} from './full-picture.js';
import {isEscapeKey, showAlert, showAlertSuccess, disableSubmitButton, unDisableSubmitButton} from './util.js';
import {HASHTAG_MAX_COUNT,FILE_TYPES} from './const.js';
import {removeSizeBtnLicteners} from './resize-photo.js';
import {onEffectRadioBtnClick, effectsRadioBtnList, resetFilter} from './slider-editor.js';
import {sendData} from './fetch.js';

const uploadForm = document.querySelector('.img-upload__form');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const submitBtn = uploadForm.querySelector('#upload-submit');
let successModal = '';
let successBtn = '';

const onPhotoEditorResetBtnClick = () => {
  closePhotoEditor();
};
const onSuccessBtnClick = () => {
  closeSuccessModal();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(document.activeElement === hashtagInput || document.activeElement === commentInput){
      evt.stopPropagation();
    } if(successModal){
      closeSuccessModal();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

function closePhotoEditor () {
  uploadForm.reset();
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
  removeSizeBtnLicteners();
  resetFilter();
  effectsRadioBtnList.removeEventListener('click', onEffectRadioBtnClick);
}

function closeSuccessModal() {
  if(successModal){
    successModal.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    successBtn.removeEventListener('click', onSuccessBtnClick);
    pageBody.removeEventListener('click', onSuccessBtnClick);
  }
}

const preview = document.querySelector('.img-upload__preview');

uploadFileControl.addEventListener('change', () => {
  if(uploadFileControl.value) {
    const file = uploadFileControl.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      preview.firstElementChild.src = URL.createObjectURL(file);
    }
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    effectsRadioBtnList.addEventListener('click', onEffectRadioBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }
});

const pristine = new Pristine(uploadForm, {
  classTo: 'text__hashtags-label',
  errorTextParent: 'text__hashtags-label',
  errorTextClass: 'text__error'
});

//Чтобы описать валидации в JavaScript, нужно вызвать метод .addValidator().
//первый аргумент что валидируем, второй - функция проверки.
// Функция проверки обязательно должна возвращать true или false, в зависимости от того, валидно ли поле.
//Третьим аргументом нужно передать сообщение об ошибке(это может строка или функция которая генерирует строку).
// если не хотите, чтобы Pristine валидировала форму по мере ввода, то передайте при подключении третьим аргументом false

const isHashtagRegValid = (value) => {
  if(value) {
    const hashtags = value.split(' ');
    const validHashtagReg = /^#[a-z-я-ё0-9]{1,19}$/i;
    let i = 0;
    const regTest = validHashtagReg.test(hashtags[i]);

    while(regTest) {
      i++;
      if(regTest === false){
        break;
      }
      return regTest;
    }
    return regTest;
  } else if(value === ''){
    return true;
  }

};

const isHashtagCountValid = (value) => {
  const hashtags = value.split(' ');
  if(hashtags.length > HASHTAG_MAX_COUNT) {
    return false;
  } else{
    return true;
  }
};
let duplicates = [];

const isDuplicateHashtags = (value) => {
  const hashtagsArray = value.split(' ');
  duplicates = hashtagsArray.filter((hashtag, index, array) => array.indexOf(hashtag) !== index);
  if(duplicates.length > 0){
    return false;
  }else{
    return true;
  }
};

const getDuplicateString = () => {
  const duplicatesString = duplicates.join(', ');
  return` ${`дубликаты: ${ duplicatesString}`}`;
};

pristine.addValidator(hashtagInput, isHashtagRegValid, 'поле Хештег заполнено не верно');
pristine.addValidator(hashtagInput, isHashtagCountValid, 'более 5ти хештегов');
pristine.addValidator(hashtagInput, isDuplicateHashtags, getDuplicateString);


const initSubmitUploadformHandler = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      disableSubmitButton(submitBtn);
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(()=> {
          showAlertSuccess(pageBody);
          successModal = document.querySelector('.success');
          successBtn = successModal.querySelector('.success__button');
          pageBody.addEventListener('click', onSuccessBtnClick);
          successBtn.addEventListener('click', onSuccessBtnClick);
          document.addEventListener('keydown', onDocumentKeydown);
        })
        .catch((err) => {
          showAlert(err.message);
        })
        .finally(unDisableSubmitButton(submitBtn));
    }
  });
};

export{initSubmitUploadformHandler, closePhotoEditor};
