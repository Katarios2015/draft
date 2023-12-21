import {PHOTOS_MAX_COUNT, LIKES_MAX_COUNT, LIKES_MIN_COUNT, AVATAR_MIN_NUMBER,DESCRIPTIONS, COMMENT_MAX_COUNT, COMMENT_MIN_COUNT, AVATAR_MAX_NUMBER, NAMES, MESSAGES} from './const.js';
import {idGenerator, getRandomInt, getRandomElementFromArray} from './util.js';

const generatePhotoId = idGenerator(PHOTOS_MAX_COUNT);
const generateUrlId = idGenerator(PHOTOS_MAX_COUNT);
const generateCommentId = idGenerator(Infinity);

const createComment = () => ({
  id: generateCommentId.next().value,
  avatar: `img/avatar-${getRandomInt(AVATAR_MIN_NUMBER, AVATAR_MAX_NUMBER)}.svg`,
  message: getRandomElementFromArray(MESSAGES),
  name: getRandomElementFromArray(NAMES),
});

const createPhotoDescription = () => ({
  id:  generatePhotoId.next().value,
  url: `photos/${generateUrlId.next().value}.jpg`,
  description: getRandomElementFromArray(DESCRIPTIONS),
  likes: getRandomInt(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: Array.from({length:getRandomInt(COMMENT_MIN_COUNT,COMMENT_MAX_COUNT)}, createComment)
});

const createPhotoDescriptions = () => Array.from({length:PHOTOS_MAX_COUNT}, createPhotoDescription);


export {createPhotoDescriptions};
