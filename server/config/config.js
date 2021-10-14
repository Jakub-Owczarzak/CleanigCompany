const mongoose = require('mongoose');

const hostDB =
  process.env.mongodb ||
  'mongodb+srv://cluster:cluster@cluster0.pzifq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

module.exports = {
  hostDB,
};
