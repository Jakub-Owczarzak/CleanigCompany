import React, { useState, useEffect } from 'react';
import { useFormik, Field, FormikProvider } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../shared/components/FormElements/CustomButton';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIComponent/LoadingSpinner';
import ImageUploader from '../../shared/components/FormElements/ImageUploader';
import {
  StyledForm,
  StyledInput,
  StyledTextArea,
  StyledErrorDiv,
} from '../../shared/StyledComponents/StyledForm';
import * as actionCreator from '../../redux/actions';
import { modalOpenHandler } from '../../shared/Functions/modalFunction';

const PlaceForm = (props) => {
  // stan do przechwytywania pliku z komponentu ImageUploader
  const [imageFilePicker, setImageFilePicker] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  console.log(props);
  // console.log('JEstem w FORMULARZU DO EDYCJI', props.editPlace);
  const { user, token } = useSelector((state) => state.authReducer);
  console.log(user);

  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalReducer.isOpen);

  const history = useHistory();

  const validate = (values) => {
    const errors = {};
    if (!values.placeName) {
      errors.placeName = 'Required';
    } else if (values.placeName.length > 25) {
      errors.placeName = 'Must be 25 characters or less';
    }

    if (!values.description) {
      errors.description = 'Required';
    } else if (values.description.length < 15) {
      errors.description = 'Must be 15 characters or more';
    }
    if (!props.editPlace) {
      if (!values.address) {
        errors.address = 'Required';
      } else if (values.address.length > 45) {
        errors.address = 'Must be 25 characters or less';
      }
    }

    return errors;
  };

  const addEditPlace = async (url, data) => {
    const newPlaceresponse = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return newPlaceresponse.json();
  };

  const formik = useFormik({
    initialValues: {
      placeName: props.editPlace ? props.editPlace.title : '',
      description: props.editPlace ? props.editPlace.description : '',
      address: '',
      isTaskFinished: false,
      checked: [],
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);
      if (!props.editPlace) {
        try {
          setIsLoading(true);

          let formData = new FormData();
          formData.append('title', values.placeName);
          formData.append('description', values.description);
          formData.append('address', values.address);
          formData.append('creator', user.id);
          formData.append('placeImage', imageFilePicker);

          const newPlace = await fetch(
            //http://localhost:8080
            '/places/ceateNewPlace',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );

          const response = await newPlace.json();

          if (response.success) {
            setIsLoading(false);
            modalOpenHandler(
              modalState,
              dispatch,
              actionCreator,
              'info',
              response.message
            );
            history.push(`/${user.id}/places`);
            console.log('NOWE MIEJSCE');
            console.log(response.message);
            console.log('Miejsce dodano');
          }
        } catch (error) {
          console.log(error);
          modalOpenHandler(
            modalState,
            dispatch,
            actionCreator,
            'info',
            error.message
          );
        }
      }
      if (props.editPlace) {
        console.log(values.isTaskFinished);
        try {
          setIsLoading(true);
          const editedPlace = await addEditPlace(
            //http://localhost:8080
            `/places/edit/${props.editPlace.placeId}`,
            {
              title: values.placeName,
              description: values.description,
              isTaskFinished: values.isTaskFinished,
            }
          );
          console.log(editedPlace);
          if (editedPlace.success) {
            setIsLoading(false);
            modalOpenHandler(
              modalState,
              dispatch,
              actionCreator,
              'info',
              editedPlace.message
            );
            console.log(editedPlace.data.creator);
            history.push(`/${editedPlace.data.creator}/places`);
            console.log('EDYTUJ');
            console.log(editedPlace);
          }
          if (editedPlace.success === false) {
            console.log('JEST BŁĄD TOKENA');
            setIsLoading(false);
            modalOpenHandler(
              modalState,
              dispatch,
              actionCreator,
              'info',
              editedPlace.message
            );
          }
        } catch (error) {
          console.log('EROR W EDICIE', error);
          setIsLoading(false);
          modalOpenHandler(
            modalState,
            dispatch,
            actionCreator,
            'info',
            error.message
          );
        }
      }
    },
  });

  useEffect(() => {
    console.log(imageFilePicker);
  }, [imageFilePicker, formik.errors]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <StyledForm onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">Place Name</label>
        <StyledInput
          id="placeName"
          name="placeName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.placeName}
          danger={Object.keys(formik.errors).includes('placeName')}
        />
        {formik.touched.placeName && formik.errors.placeName && (
          <StyledErrorDiv>{formik.errors.placeName}</StyledErrorDiv>
        )}

        <label htmlFor="description">Description</label>
        <StyledTextArea
          as="textarea"
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          danger={Object.keys(formik.errors).includes('description')}
        />
        {formik.touched.description && formik.errors.description && (
          <StyledErrorDiv>{formik.errors.description}</StyledErrorDiv>
        )}

        {user.userType === 'admin' && (
          <FormikProvider value={formik}>
            <label>
              <Field type="checkbox" name="isTaskFinished" />
              {formik.values.isTaskFinished
                ? 'Lokal posprzątany'
                : ' Lokal czeka na sprzątanie '}
            </label>
          </FormikProvider>
        )}

        {!props.editPlace && (
          <>
            <label htmlFor="address">Address</label>
            <StyledInput
              id="address"
              name="address"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              danger={Object.keys(formik.errors).includes('address')}
            />
            {formik.touched.address && formik.errors.address && (
              <StyledErrorDiv>{formik.errors.address}</StyledErrorDiv>
            )}
            <ImageUploader
              id={'image'}
              name={'image'}
              fileState={imageFilePicker}
              fileStateHandler={setImageFilePicker}
            />
            {!imageFilePicker && (
              <StyledErrorDiv> Photo of the place is required! </StyledErrorDiv>
            )}
          </>
        )}

        {/* <button type="submit">SUBMIT</button> */}
        {/* <Button
          type="submit"
          disabled={Object.keys(formik.errors).length > 0 || !imageFilePicker}
        >
          {!props.editPlace ? 'ADD PLACE' : 'EDIT PLACE'}
        </Button> */}
        {!props.editPlace ? (
          <Button
            type="submit"
            disabled={Object.keys(formik.errors).length > 0 || !imageFilePicker}
          >
            ADD PLACE
          </Button>
        ) : (
          <Button type="submit">EDIT PLACE</Button>
        )}
      </StyledForm>
    </>
  );
};

export default PlaceForm;
