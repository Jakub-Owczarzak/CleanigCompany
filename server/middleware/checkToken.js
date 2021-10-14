const jswt = require('jsonwebtoken');
const HttpError = require('../../model/error');

const checkToken = (req, res, next) => {
  // przed wysłaniem każdego zapytania oprócz GET przegląarka wysyła minizapytanie przed sprawdzając czy serwer jest dostępny jest to zapytanie OPTIONS gdy dostanie odpowiedź
  // twierdzącą dopiero wysyła zapytanie np POST dlatego ważne jest sprawdzenie tego pre-zapytania
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    console.log('JESTEM W CHECK TOKEN', req.headers.authorization);
    // jeśli token jest przekazywany w headersach
    const token = req.headers.authorization.split(' ')[1]; //  nagłówek będzie wyglądał tak  Authorization : 'Bearer Token'
    if (!token) {
      throw new Error('Authentication token failed');
    }

    const decodetToken = jswt.verify(token, 'super_SECRET_KEY');
    req.decodetToken = decodetToken;
    req.userTokenData = { userId: decodetToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Token not verified. Acces denied!', 401);
    return next(error);
  }
};

module.exports = checkToken;
