import React from 'react';

import styled from 'styled-components';

import Card from '../../shared/components/UIComponent/Card';
import PlaceItem from './PlaceItem';
import CustomButton from '../../shared/components/FormElements/CustomButton';
import { StyledUl } from '../../shared/StyledComponents/StyledUl';

const PlaceList = (props) => {
  console.log('miejsca');
  console.log(props);
  return (
    <>
      {props.places.length === 0 ? (
        <Card>
          <h2>No places found. Meybe add one ?</h2>
          <CustomButton to={'/userPlace/new'}>ADD PLACES</CustomButton>
        </Card>
      ) : (
        <StyledUl>
          {props.places.map((place) => (
            <PlaceItem
              key={place._id}
              id={place._id}
              image={place.placeImage}
              title={place.title}
              description={place.description}
              address={place.address}
              creatorId={place.creator}
              coordinates={place.location}
              istaskfinished={place.isTaskFinished}
            />
          ))}
        </StyledUl>
      )}
    </>
  );
};

export default PlaceList;
