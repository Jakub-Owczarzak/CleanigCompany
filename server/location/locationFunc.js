//// https://positionstack.com/documentation
// Please read documentation

const API_KEY = '2e0f1e8915bbba25662629dfad62af6c';
const axios = require('axios');

const getCoordinates = async (adress) => {
  try {
    const response = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=2e0f1e8915bbba25662629dfad62af6c&query=${encodeURIComponent(
        adress
      )}`
    );
    console.log('Zwrot koordynató');
    console.log(response.data.data[0]);
    console.log(
      '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'
    );

    if (response === undefined) {
      console.log('W ifce błędu');
      throw Error('Nie znaleziono lokacji. Błędny adres');
    }

    return {
      lat: response.data.data[0].latitude,
      long: response.data.data[0].longitude,
    };
  } catch (error) {
    console.log('W ifce błędu');
    console.log(
      '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'
    );
    console.log(error);
  }
};

module.exports = getCoordinates;
