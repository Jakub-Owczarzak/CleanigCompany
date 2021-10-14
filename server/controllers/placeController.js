const mongoose = require('mongoose');

const getCoordinates = require('../location/locationFunc');
const fs = require('fs');
const Place = require('../../model/dbModels/placeSchema');

const HttpError = require('../../model/error');
const Users = require('../../model/dbModels/userSchema');

const fetchAllPlaces = async (req, res) => {
  try {
    // Pobieranie całej kolekcji
    const dbResponse = await Place.find({});
    return res.status(200).json({ succes: true, data: dbResponse });
  } catch (error) {
    res.status(error.code).json({ succes: false, message: error.message });
  }
};

const createNewPlace = async (req, res) => {
  const { title, description, address, creator } = req.body;

  // tutaj mamy dostęp do wartości z middlewara
  const date = req.date;
  console.log(address);

  try {
    const cordinates = await getCoordinates(address);
    console.log('JESTEM W ENDPOICIE');
    if (!cordinates) {
      throw new HttpError('Coordinates ERROR. Wrong adress!', 400);
    }
    // Tworzenie nowej instancji Productu
    // const createdPlace = new Place({
    //   title,
    //   description,
    //   location: cordinates,
    //   address,
    //   creator,
    //   createdOn: date,
    // });

    // Zapisuwanie w bazie
    // const dbResponse = await createdPlace.save();

    // Tworzenie i zapisywanie wersja skrócona !!!!!!!

    const placeImage = req.file ? req.file.path.replace(/\\/g, '/') : '';

    const session = await mongoose.startSession();
    session.startTransaction();
    console.log('jestem w sesji');
    const place = await Place.create(
      [
        {
          title,
          description,
          location: cordinates,
          placeImage: placeImage,
          address,
          creator,
          createdOn: date,
          isTaskFinished: false,
        },
      ],
      { session }
    );
    console.log(place);
    const updateResponse = await Users.findByIdAndUpdate(
      { _id: creator },
      { $push: { ownPlaces: place[0].id } },
      { session }
    );

    console.log(updateResponse);
    await session.commitTransaction();
    session.endSession();

    // const place = await Place.create({
    //   title,
    //   description,
    //   location: cordinates,
    //   image,
    //   address,
    //   creator,
    //   createdOn: date,
    // });

    //

    // if (place) {
    //   await Users.findByIdAndUpdate(
    //     { _id: creator },
    //     { $push: { ownPlaces: place._id } }
    //   );
    // }
    // console.log(dbResponse);

    res
      .status(200)
      .json({ success: true, message: 'Yop added new place!', data: place });
  } catch (error) {
    if (req.file) {
      // w obsłudze błędów sprawdzamy czy zapytanie posiada jakieś plik jeśli tak to kasujemy
      fs.unlink(req.file.path, (err) => {
        console.log(err);
      });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getPlacebyId = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  try {
    // Pobieranie z bazy danych
    const dbResponse = await Place.find({ _id: id }).populate(
      'creator',
      '-password'
    );

    if (!dbResponse) {
      throw new HttpError('Place not found !', 400);
    }

    return res.status(200).json({ succes: true, data: dbResponse });
  } catch (error) {
    res
      .status(error.code ? error.code : 400)
      .json({ succes: false, message: error });
  }
};

const findUserPlace = async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    // metoda find w { po czym szukamy : wartość do znalezienia}
    const userWithPlaces = await Users.findById(userId, '-password').populate(
      'ownPlaces'
    );
    console.log(userWithPlaces);
    if (userWithPlaces.ownPlaces.length === 0) {
      console.log('dupa');

      return next(new HttpError('This user has no added places', 404));
    }
    console.log('po ifce');
    return res.status(200).json({
      succes: true,
      message: `Places has been loaded`,
      // zamiana każdego elementu w talbicy na z jsona na obiekt i likwidowanie _id
      data: userWithPlaces,
    });
  } catch (error) {
    console.log('object');
  }
};
const editPlace = async (req, res) => {
  const { title, description, isTaskFinished } = req.body;
  const fromMiddleware = req.date;

  const idFromToken = req.userTokenData.userId; // wyciągam id z tokena dopisanego przez middleware checkToken
  console.log(idFromToken);

  // const isReqBodyValid = await editPlaceSchema.validate(req.body);
  // console.log(isReqBodyValid);
  console.log('PRZED TRY');
  const { id } = req.params; // wyciagamy id creatora z URL z zapytania
  console.log(id);

  try {
    const ifAdmin = await Users.findById(idFromToken);

    console.log('ADMIN', ifAdmin._id.toString()); // musimy rzutować _id na stringa gdyż jest to type ObjectId z bazy mongo więc tyby będą różne

    // Weryfikacja przed usunieciem czy zapytanie przyszło albo od twórcy miejsca albo od admina
    if (idFromToken !== id && idFromToken !== ifAdmin._id.toString()) {
      throw new Error('Invalid User ID');
    }
    // const isReqBodyValid = await editPlaceSchema.validate(req.body);
    // console.log(isReqBodyValid);
    // metoda przyjmuje 3 parametry {objectId:  wartość po której ma być wyszukany rekord} {właściwość do edycji:nowa wawrtość, itd } {czy ma zwrócić obiekt po czy przed edycją new:true}
    const placeBeforeUpdate = await Place.findByIdAndUpdate(
      { _id: id },
      {
        title: title,
        description: description,
        isTaskFinished: isTaskFinished,
      },
      { new: true }
    );

    console.log(placeBeforeUpdate);

    return res.status(200).json({
      success: true,
      message: 'Place has been edited',
      data: placeBeforeUpdate,
    });
  } catch (error) {
    console.log('TO MÓJ ERROR', error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

const deletePlace = async (req, res) => {
  const { id } = req.params; // creatora z urla
  const idFromToken = req.userTokenData.userId; // wyciągam id z tokena dopisanego przez middleware checkToken

  try {
    const ifAdmin = await Users.findById(idFromToken);

    console.log('ADMIN', ifAdmin._id.toString()); // musimy rzutować _id na stringa gdyż jest to type ObjectId z bazy mongo więc tyby będą różne
    // sprawdzenie czy zaptyanie DELETE przyszło od twórcy albo od admina jeśli nie rzucamy błędem
    if (idFromToken !== id && idFromToken !== ifAdmin._id.toString()) {
      throw new Error('Invalid User ID');
    }
    // Szukanie w talbicy kolekcji
    // const usersWithPlace = await Users.find({
    //   ownPlaces: { $in: id },
    //   // email: 'agata@gmail.com',
    // });

    // aby usunąć zdjęcie najpierw wyszukujemy mniejsca
    const place = await Place.findById(id);

    console.log(place);
    const imagePath = place.placeImage; // pobieramy ścieżkę do zcjęcia z zwróceonego miejsca

    const session = await mongoose.startSession();
    session.startTransaction();
    const deletedPlace = await Place.deleteOne({ _id: id }, { session });
    console.log(deletedPlace);
    const updateResponse = await Users.updateMany(
      { ownPlaces: { $in: id } }, // warunek szuakmy USerów którzy w tablicy ownPlaces mają podane id
      { $pull: { ownPlaces: id } }, // co ma się stać w wyszukanych userach wyciagnij/usuń zadane id
      { session } // podaejmy jako argument sesję do której należy operacja
    );
    console.log(updateResponse);
    await session.commitTransaction();
    session.endSession();
    // po usunięciu rekordu i wszelkich referencji do niego
    //usuwamy zdjecie wykorzstujac wcześniej pobraną ścieżkę
    fs.unlink(imagePath, (err) => {
      console.log(err);
    });

    // (await session)
    // .withTransaction(async () => {
    //   const deletedPlace = await Place.deleteOne({ _id: id });
    //   console.log(deletedPlace.deletedCount);
    //   const updateResponse = await Users.updateMany(
    //     { ownPlaces: { $in: id } }, // warunek szuakmy USerów którzy w tablicy ownPlaces mają podane id
    //     { $pull: { ownPlaces: id } } // co ma się stać w wyszukanych userach wyciagnij/usuń zadane id
    //   );
    //   console.log(updateResponse);
    //   return Promise.resolve();
    // });

    // const deletedPlace = await Place.deleteOne({ _id: id });
    // console.log(deletedPlace.deletedCount);

    // if (deletedPlace.deletedCount === 0) {
    //   return res.status(404).json({
    //     succes: false,
    //     message: 'Place not found! Wrong id or already deleted',
    //   });
    // }

    // //Modyfikowanie wielu obiektrów
    // const updateResponse = await Users.updateMany(
    //   { ownPlaces: { $in: id } }, // warunek szuakmy USerów którzy w tablicy ownPlaces mają podane id
    //   { $pull: { ownPlaces: id } } // co ma się stać w wyszukanych userach wyciagnij/usuń zadane id
    // );

    // console.log(updateResponse);

    // console.log(deletedPlace);
    res.status(200).json({ succes: true, message: 'Place has been deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, error: error.message });
  }
};

module.exports = {
  fetchAllPlaces,
  createNewPlace,
  findUserPlace,
  getPlacebyId,
  editPlace,
  deletePlace,
};
