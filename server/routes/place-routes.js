const express = require('express');
const placeController = require('../controllers/placeController');
const dataValidFunc = require('../../model/validation/dataValidFunc');
const fileUpload = require('../middleware/file-upload');
const checkToken = require('../middleware/checkToken');
const {
  newPlaceSchema,
  editPlaceSchema,
} = require('../../model/validation/placeSchema');

const router = express.Router();

router.get('/', placeController.fetchAllPlaces);

router.get('/userPlace/:userId', placeController.findUserPlace);

router.get('/place/:id', placeController.getPlacebyId);

// Aby zabespieczyć endpointy przed dostępem używamy roter.use i przekazujemy funckję middleware która sprawdzi ważność JSWT tokena i albo puści dalej
// albo zwróci błąd
router.use(checkToken);

// wszystkie erndpointy pod midllewarem z tokenem są zabespieczone i wymagają tokena

router.post(
  '/ceateNewPlace',
  fileUpload.single('placeImage'),
  dataValidFunc(newPlaceSchema),
  placeController.createNewPlace
);

router.post(
  '/edit/:id',
  dataValidFunc(editPlaceSchema),
  placeController.editPlace
);

router.delete('/delete/:id', placeController.deletePlace);

module.exports = router;
