import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFOrmik } from 'formik';

import PlaceForm from './PlaceForm';

const UpdatePlace = () => {
  console.log('JESTEM W UPDATE');
  const [placeToEdit, setPLaceToEdit] = useState(false);
  const { placeId } = useParams();
  console.log(placeId);

  const getPLacetoEdit = async (placeID) => {
    console.log('FUNKCJA');
    try {
      const fetchedPlace = await fetch(
        //http://localhost:8080
        `/places/place/${placeId}`
      );
      const body = await fetchedPlace.json();
      if (body) {
        console.log('JEstem w ifce', body.data[0]);
        const dataToEdit = {
          placeId,
          title: body.data[0].title,
          description: body.data[0].description,
        };
        setPLaceToEdit(dataToEdit);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log('JEstem w use effect', placeToEdit);
    getPLacetoEdit();
    console.log(placeToEdit);
  }, []);

  if (!placeToEdit) {
    // return <h2>JEST MIEJSCE</h2>;
    return <h2>Could not find place!</h2>;
  }

  // return <h2>MIEJSCE ZNALEZIONO</h2>;

  return <PlaceForm editPlace={placeToEdit} />;

  // return <PlaceForm editPlace={[]} />;
};

export default UpdatePlace;
