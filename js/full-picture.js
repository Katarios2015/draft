import {picturesContainer} from './mini-pictures.js';
import {isEscapeKey} from './util.js';
import {COMMENT_STEP} from './const.js';

const pageBody = document.querySelector('body');
const bigPictureModal = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const commentsFragment = document.createDocumentFragment();
const commentsContainer = bigPictureModal.querySelector('.social__comments');

const visibleCommentsCount = bigPictureModal.querySelector('.comments-count-showed');
const totalCommentsCount = bigPictureModal.querySelector('.comments-count');
const commentsLoader = bigPictureModal.querySelector('.social__comments-loader');

const exitBtn = bigPictureModal.querySelector('#picture-cancel');

const fillBigPhoto = (emptyBigPhoto, currentObject) => {
  emptyBigPhoto.querySelector('.likes-count').textContent = currentObject.likes;
  emptyBigPhoto.querySelector('.comments-count').textContent = currentObject.comments.length;
  emptyBigPhoto.querySelector('.social__caption').textContent = currentObject.description;
  emptyBigPhoto.querySelector('.big-picture__img')
    .querySelector('img').src = currentObject.url;
};

let renderedCommentsFirstIndex = 0;
let newRenderedCommentsLastIndex = COMMENT_STEP;
let onCommentsLoaderClick = () => {};

const createCommentsList = (currentObject) => {
  const comments = currentObject.comments;
  const commentsCount = comments.length;
  totalCommentsCount.textContent = commentsCount;

  visibleCommentsCount.textContent = Math.min(commentsCount,newRenderedCommentsLastIndex);

  if (newRenderedCommentsLastIndex >= commentsCount){
    commentsLoader.classList.add('hidden');
  }

  comments.slice(renderedCommentsFirstIndex, newRenderedCommentsLastIndex)
    .forEach(({avatar, message, name}) => {
      const comment = commentTemplate.cloneNode(true);
      comment.querySelector('.social__picture').src = avatar;
      comment.querySelector('.social__picture').alt = name;
      comment.querySelector('.social__text').textContent = message;

      commentsFragment.appendChild(comment);
    });
  commentsContainer.appendChild(commentsFragment);
};

const clearCommentsList = () => {
  commentsContainer.innerHTML = '';
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

const onExitBtnClick = () => {
  closeFullPhoto();
};

function closeFullPhoto () {
  bigPictureModal.classList.add('hidden');
  clearCommentsList();
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  exitBtn.removeEventListener('click', onExitBtnClick);
  renderedCommentsFirstIndex = 0;
  newRenderedCommentsLastIndex = COMMENT_STEP;
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

const initFullPhotoOpenHandler = (photos) => {
  picturesContainer.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');
    if(currentPicture) {
      const pictureId = Number(currentPicture.dataset.id);
      const pictureObject = photos.find((item) => item.id === pictureId);

      bigPictureModal.classList.remove('hidden');
      pageBody.classList.add('modal-open');

      document.addEventListener('keydown', onDocumentKeydown);
      exitBtn.addEventListener('click', onExitBtnClick);

      fillBigPhoto(bigPictureModal, pictureObject);
      createCommentsList(pictureObject);
      onCommentsLoaderClick = () => {
        renderedCommentsFirstIndex = newRenderedCommentsLastIndex;
        newRenderedCommentsLastIndex += COMMENT_STEP;
        createCommentsList(pictureObject);
      };
      commentsLoader.addEventListener('click', onCommentsLoaderClick);
    }
  });
};


export {initFullPhotoOpenHandler};
