import {createPhotoDescriptions} from './data.js';
import {createGallery} from './mini-pictures.js';

import {getFullPhotoOpenHandler} from './full-picture.js';

const photoDescriptions = createPhotoDescriptions();

createGallery(photoDescriptions);
getFullPhotoOpenHandler(photoDescriptions);

