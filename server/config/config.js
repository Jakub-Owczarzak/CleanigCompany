const mongoose = require('mongoose');

const hostDB =
  process.env.mongodb ||
  'mongo db cluster link';

module.exports = {
  hostDB,
};
