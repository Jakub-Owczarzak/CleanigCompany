const yup = require('yup');

const newPlaceSchema = yup.object().shape({
  title: yup.string().required().min(5),
  description: yup.string().min(5).max(100),
  address: yup.string().required(),
  creator: yup.string().required(),
  createdOnDate: yup.date().default(() => {
    return new Date();
  }),
});

const editPlaceSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().min(5),
  isTaskFinished: yup.boolean().required(),
});

module.exports = {
  newPlaceSchema,
  editPlaceSchema,
};
