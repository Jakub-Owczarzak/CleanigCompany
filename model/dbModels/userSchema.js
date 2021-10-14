const moongoose = require('mongoose');

const newUserSchema = new moongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  ownPlaces: [
    {
      type: moongoose.Schema.Types.ObjectId,
      ref: 'Places',
    },
  ],
  userType: { type: String, required: true },
  userImage: { type: String },
});

const Users = moongoose.model('Users', newUserSchema);

module.exports = Users;
