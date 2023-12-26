const PHOTOS_MAX_COUNT = 25;
const LIKES_MAX_COUNT = 20;
const LIKES_MIN_COUNT = 15;
const COMMENT_MAX_COUNT = 20;
const COMMENT_MIN_COUNT = 0;
const AVATAR_MIN_NUMBER = 1;
const AVATAR_MAX_NUMBER = 6;
const COMMENT_STEP = 5;
const HASHTAG_MAX_COUNT = 5;
const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;
const ALERT_SHOW_TIME = 5000;

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const DESCRIPTIONS = ['котик', 'закат', 'рассвет'];
const NAMES = ['Артем','Владислав', 'Светлана', 'Георгий', 'Анжелика'];
const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const Effects = {
  none: 'effect-none',
  chrome: 'effect-chrome',
  sepia: 'effect-sepia',
  marvin: 'effect-marvin',
  phobos: 'effect-phobos',
  heat: 'effect-heat',
};

const sliderOptionsObjectChromeSepia = {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
};


const sliderOptionsObjectMarvinDefault = {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
};


const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

export {PHOTOS_MAX_COUNT, LIKES_MAX_COUNT, LIKES_MIN_COUNT, AVATAR_MIN_NUMBER,DESCRIPTIONS,COMMENT_MAX_COUNT,COMMENT_MIN_COUNT, AVATAR_MAX_NUMBER, NAMES, MESSAGES, COMMENT_STEP, HASHTAG_MAX_COUNT, SCALE_STEP, SCALE_MAX, SCALE_MIN, Effects, sliderOptionsObjectChromeSepia, sliderOptionsObjectMarvinDefault, ALERT_SHOW_TIME, SubmitButtonText, FILE_TYPES};
