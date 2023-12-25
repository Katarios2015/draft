import {ALERT_SHOW_TIME, SubmitButtonText} from './const.js';

const idGenerator = function*(maxCount) {
  let currentId = 1;
  while (currentId <= maxCount) {
    yield currentId++;
  }
};

const getRandomInt = (min, max)=> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElementFromArray = (elementsArray) => {
  const randomElement = elementsArray[getRandomInt(0, elementsArray.length - 1)];
  return randomElement;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const getEffectSelector = (currentInputId) => {
  const selectors = {
    'effect-none': 'effects__preview--none',
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat',

  };
  return selectors[currentInputId];
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const disableSubmitButton = (button) => {
  button.disabled = true;
  button.textContent = SubmitButtonText.SENDING;
};

const unDisableSubmitButton = (button) => {
  button.disabled = false;
  button.textContent = SubmitButtonText.IDLE;
};

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const showAlertSuccess = (container) => {
  const success = successTemplate.cloneNode(true);
  container.appendChild(success);
};

export {idGenerator, getRandomInt, getRandomElementFromArray, isEscapeKey, getEffectSelector, showAlert, showAlertSuccess, disableSubmitButton, unDisableSubmitButton};
