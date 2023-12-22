import {createPhotoDescriptions} from './data.js';
import {createGallery} from './mini-pictures.js';

import {initFullPhotoOpenHandler} from './full-picture.js';
import './upload-photo-form.js';

const photoDescriptions = createPhotoDescriptions();

createGallery(photoDescriptions);
initFullPhotoOpenHandler(photoDescriptions);

