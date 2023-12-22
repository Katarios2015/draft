import {pageBody} from './full-picture.js';
import {isEscapeKey} from './util.js';
import {HASHTAG_MAX_COUNT} from './const.js';

const uploadForm = document.querySelector('.img-upload__form');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const onPhotoEditorResetBtnClick = () => {
  closePhotoEditor();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(document.activeElement === hashtagInput || document.activeElement === commentInput){
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

function closePhotoEditor () {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
}

uploadFileControl.addEventListener('change', ()=> {
  if(uploadFileControl.value) {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
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

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
