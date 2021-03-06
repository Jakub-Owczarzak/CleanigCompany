import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PlaceList from '../components/PlaceList';
import CustomButton from '../../shared/components/FormElements/CustomButton';
import Card from '../../shared/components/UIComponent/Card';

const UserPlaces = () => {
  let { url } = useRouteMatch();
  const { userId } = useParams();

  const { user } = useSelector((state) => state.authReducer);
  console.log('Miejsca usera z redaxa', user.ownPlaces);
  console.log('Typ usera z reduxa', user.userType);

  const [userPlaces, setUserPlaces] = useState(user.ownPlaces);
  // const [newUserPlaces, setNewUserPlaces] = useState([]);

  // funkcje do pobierania userów
  const fetchUserPlaces = async () => {
    try {
      const response = await fetch(
        //http://localhost:8080
        `/places/userPlace/${userId}`
      );
      const body = await response.json();
      console.log(body);

      setUserPlaces(body.data.ownPlaces);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserPlaces();
  }, [user.ownPlaces]);

  if (userPlaces.length === 0) {
    return (
      <Card>
        {user.userType === 'user' && (
          <>
            <h2>No places found. Meybe add one ? </h2>
            <CustomButton to={'/places/new'}>ADD PLACES</CustomButton>
          </>
        )}
        {user.userType === 'admin' && <h2>User has no places ? </h2>}
      </Card>
    );
  }

  return <PlaceList places={userPlaces} />;
};

export default UserPlaces;
