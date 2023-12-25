//import {createPhotoDescriptions} from './data.js';
import {showAlert} from './util.js';
import {getData} from './fetch.js';
import {createGallery} from './mini-pictures.js';

import {initFullPhotoOpenHandler} from './full-picture.js';
import {initSubmitUploadformHandler, closePhotoEditor} from './upload-photo-form.js';

//const photoDescriptions = createPhotoDescriptions();
getData()
  .then((photos) => {
    createGallery(photos);
    initFullPhotoOpenHandler(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
initSubmitUploadformHandler(closePhotoEditor);
