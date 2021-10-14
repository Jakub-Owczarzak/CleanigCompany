const yup = require('yup');

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required(),
  createdOnDate: yup.date().default(() => new Date()),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

module.exports = {
  signupSchema,
  loginSchema,
};
