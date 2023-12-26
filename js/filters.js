import {createGallery} from './mini-pictures.js';
import {createPhotoDescriptions} from './data.js';
import {getRandomInt} from './util.js';

const filterSection = document.querySelector('.img-filters');
const defaultFilter = filterSection.querySelector('#filter-default');

const randomFilter = filterSection.querySelector('#filter-random');
const discussedFilter = filterSection.querySelector('#filter-discussed');


const initFilters = (photosArray) =>{
  filterSection.classList.remove('img-filters--inactive');
  createGallery(photosArray.slice());

  filterSection.addEventListener('click', (evt)=> {
    const currentFilter = evt.target.closest('.img-filters__button');

    if(currentFilter) {
      const filtersBtns = filterSection.querySelectorAll('.img-filters__button');
      filtersBtns.forEach((item)=> {
        if(item.classList.contains('img-filters__button--active')){
          item.classList.remove('img-filters__button--active');
        }
      });
    }
    currentFilter.classList.toggle('img-filters__button--active');
  });
};


const getRandomPhotos = (array)=> {
  let randomIdexs = [];
  while(randomIdexs.length < 10){
    const randomIndex = getRandomInt(0, array.length - 1);
    randomIdexs.push(randomIndex);
    const set = new Set(randomIdexs);
    randomIdexs = Array.from(set);
  }
  const randomPhotos = [];
  randomIdexs.forEach((item)=> {
    randomPhotos.push(array[item]);
  });
  return randomPhotos;
};

const sortByComments = (array)=> {
  const sortedArray = array.slice();
  sortedArray.sort((a, b)=>b.comments.length - a.comments.length);
  return sortedArray;
};

sortByComments(createPhotoDescriptions());

const onDefaulFilterClick = (cb) => {
  defaultFilter.addEventListener('click', ()=> {

    cb();
  });
};

const onRandomFilterClick = (cb) => {
  randomFilter.addEventListener('click', ()=> {
    cb();
  });
};

const onDiscussedFilterClick = (cb) => {
  discussedFilter.addEventListener('click', ()=> {
    cb();
  });
};

export {initFilters, onDefaulFilterClick, onRandomFilterClick, onDiscussedFilterClick, getRandomPhotos, sortByComments};
