const fs = require('fs');

const dataValidFunc = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    const isValid = await schema.validate(body);
    console.log(isValid);
    req.isValid = isValid;
    console.log('JESTEM W MIDDLEWARE');
    if (isValid.createdOnDate) {
      //Aby przekazać wartość i wyrzuć go z middlewara należy dodać tą wartość to requesta
      req.date = isValid.createdOnDate;
    }
    next();
  } catch (error) {
    if (req.file) {
      // w obsłudze błędów sprawdzamy czy zapytanie posiada jakieś plik jeśli tak to kasujemy
      fs.unlink(req.file.path, (err) => {
        console.log(err);
      });
    }
    return res.status(400).json({ success: false, message: error.errors });
  }
};

module.exports = dataValidFunc;
