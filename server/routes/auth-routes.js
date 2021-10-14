const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const dataValidFunc = require('../../model/validation/dataValidFunc');
const fileUpload = require('../middleware/file-upload'); // ściagamy middle wara
const checkToken = require('../middleware/checkToken');

const {
  signupSchema,
  loginSchema,
} = require('../../model/validation/userSchema');

router.get('/', authController.getAllUsers);

router.post(
  '/signup',
  fileUpload.single('image'), // middleware wywołuje metodę single i podajemy klucz jaki wysyłamy z frontu
  dataValidFunc(signupSchema),
  authController.signup
);

router.post('/login', authController.login);

router.use(checkToken);
router.post('/loginToken', authController.loginToken);

module.exports = router;
