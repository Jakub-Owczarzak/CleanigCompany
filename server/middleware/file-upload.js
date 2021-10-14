const multer = require('multer');

const { v4: uuidv4 } = require('uuid');

const MIME_TYPE_MAP = {
  // tytpy rozszerzeń jakie chcemy wyciągnać z przychodzącego plikju
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const fileUpload = multer({
  limits: 500000, // limit kilobajtów
  storage: multer.diskStorage({
    //właściwość odpowiadająca zamiejsce gdzie konfigurujemy przestrzeń na zapisane pliki
    destination: (req, file, callback) => {
      callback(null, 'uploads/images'); // wskazujemy folder
    },
    // właściwość odpowiadająca za generowanie unikalnej nazwy wraz z rozszerzeniem
    filename: (req, file, callback) => {
      const ext = MIME_TYPE_MAP[file.mimetype]; // wyszukujemy z przychodzącegopliku typ i szukamy w naszym spisie
      // dwa wykrzyniki konwertują null albo andefindet na false

      callback(null, uuidv4() + '.' + ext); // w funckji callback null= błąd, następnie generujemy nazwę zapomocą unikalnego klucza + rozszerzenie
    },
  }), //
  fileFilter: (req, file, callback) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    // dwa wykrzyniki konwertują null albo undefindet na false
    let error = isValid ? null : new Error('Invalid mime type');
    callback(error, isValid);
  },
});

module.exports = fileUpload;
