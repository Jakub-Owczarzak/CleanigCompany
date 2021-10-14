const express = require('express');
const fs = require('fs');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../../model/error');
const Users = require('../../model/dbModels/userSchema');

const getAllUsers = async (req, res) => {
  // przy metodach wyszukujących w bazie po warunku wyszukiwania {} podajemy w stringu właściowości które mają zostać pobrane z bazy
  // za pomocę -password wskazujemy aby pobrano wszystko oprócz właściwości password
  try {
    const allUsers = await Users.find({}, '-password').populate('ownPlaces');
    return res
      .status(200)
      .json({ success: true, message: 'List od users', users: allUsers });
  } catch (err) {
    const error = new HttpError('Fetching users failed, please try again', 404);

    return res
      .status(error.code)
      .json({ success: false, message: error.message });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const date = req.date;
  const isValid = req.isValid;
  console.log(isValid);
  console.log(name);
  console.log(password);

  try {
    const ifUserExists = await Users.findOne({ email: email });
    if (ifUserExists) {
      if (req.file) {
        // w obsłudze błędów sprawdzamy czy zapytanie posiada jakieś plik jeśli tak to kasujemy
        fs.unlink(req.file.path, (err) => {
          console.log(err);
        });
      }
      throw new HttpError('Email already exists!', 404);
    }

    // dynamiczne sprawdzanie czy zapytanie posiada plik i generowanie ścieżki
    // na windows jest problem z zapisem ścieżek
    // zapisują się one z front slashami \ i trzeba je zaminić na /
    const userImage = req.file ? req.file.path.replace(/\\/g, '/') : '';

    // tworzenie parametru salt do hashowania
    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    console.log(userImage);
    const newUser = await Users.create({
      userName: name,
      email: email,
      password: hashedPassword, // przypisanie to rekordu usera i hashowanie hasła
      userImage: userImage, // konkatenacja ścieżki do pliku i zapis w bazie
      // jeśli zdjęcie będzie zapisywane na NASZYM serwerze nie potrzebne jest dopisek z domeną
      // jeśli zapisujemuy na zewnętrznym nośniku zapis wygląda JN
      //  userImage: 'http:localhost:8080/' + req.file.path,
      userType: 'user',
    });

    // tworzymy token
    // metoda sign() przyjmuje następujące argumenty dane do przekazania w tokenie, oraz secret key do zakodowania, oraz 3 argument parametry i oddaktoowe opcje jak np
    // czas ważności
    let token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      'super_SECRET_KEY',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      message: 'New use has been created!',
      user: {
        email: newUser.email,
        ownPlaces: newUser.ownPlaces,
        name: newUser.name,
        userImage: newUser.userImage,
        userType: newUser.userType,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    if (req.file) {
      // w obsłudze błędów sprawdzamy czy zapytanie posiada jakieś plik jeśli tak to kasujemy
      fs.unlink(req.file.path, (err) => {
        console.log(err);
      });
    }
    return res.status(404).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  console.log(email);
  try {
    console.log('przed');
    const isUserExists = await Users.findOne({ email: email }).populate(
      'ownPlaces'
    );

    if (!isUserExists) {
      throw new HttpError('User doesn`t exist. Please create an account!', 404);
    }

    console.log(isUserExists.ownPlaces);
    // rozkodowywanie hasła i porówananie
    const isPasswordValid = await bcryptjs.compare(
      password,
      isUserExists.password
    );
    console.log(isPasswordValid);
    // jeśli wynik funkcji deszfrującej hasło zwróci false my rzucamy błędem
    if (!isPasswordValid) {
      throw new HttpError('Incorrect password!', 404);
    }

    const token = jwt.sign(
      { userId: isUserExists._id, email: isUserExists.email },
      'super_SECRET_KEY',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      message: 'User successfly logged in!',
      user: {
        id: isUserExists._id,
        email: isUserExists.email,
        ownPlaces: isUserExists.ownPlaces,
        userType: isUserExists.userType,
        userImage: isUserExists.userImage,
      },
      token,
    });
  } catch (error) {
    console.log('Wali z błędi');
    return res.status(400).json({ success: false, message: error.message });
  }
};
const loginToken = async (req, res) => {
  console.log('TOKEN LOGIN');
  const token = req.decodetToken;
  const expTime = req.body.expTime;
  const date = new Date(expTime).getTime();
  const date2 = new Date().getTime();
  const wynik = date - date2;
  try {
    if (date > date2) {
      console.log('Token ważne');
      const user = await Users.findById(token.userId);
      if (user) {
        return res.status(200).json({
          success: true,
          message: 'User successfly logged in!',
          user: {
            id: user._id,
            email: user.email,
            ownPlaces: user.ownPlaces,
            userType: user.userType,
            userImage: user.userImage,
          },
        });
      }
    } else {
      console.log('token nie ważny');
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please authenticate again',
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Automatic authentication goes wrong! Please authenticate again',
    });
  }

  console.log('czas z tokena', expTime);
  console.log(date);

  console.log('czas serwera', date2);
  console.log((wynik * 0.001) / 60);
  console.log('rozkodowany token', token);
};

module.exports = {
  getAllUsers,
  signup,
  login,
  loginToken,
};
