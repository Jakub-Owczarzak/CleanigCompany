import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import CustomButton from '../../shared/components/FormElements/CustomButton';
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

const AuthForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFilePicker, setImageFilePicker] = useState(null);
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalReducer.isOpen);
  const history = useHistory();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else {
      const regex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

      const isEmailValid = regex.test(values.email);
      if (!isEmailValid) {
        errors.email = 'Incorect format of email adreess';
      }
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 5) {
      errors.password = 'Must be 5 characters or more';
    } else if (values.password === values.userName) {
      errors.password = 'User Name and password must be diffrent';
    }

    if (props.formType === 'register') {
      if (!values.userName) {
        errors.userName = 'Required';
      } else if (values.userName.length < 5) {
        errors.userName = 'Must be 5 characters or more';
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Password are diffrent!';
      }
    }
    return errors;
  };

  const postAuth = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: async (values) => {
      if (props.formType === 'register') {
        // przygotowanie obiektu z danymi
        let formData = new FormData();

        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('name', values.userName);
        formData.append('image', imageFilePicker);
        try {
          setIsLoading(true);
          const newUser = await fetch('/auth/signup', {
            //http://localhost:8080
            method: 'POST',
            body: formData,
          });

          const response = await newUser.json();
          if (response.success) {
            console.log('Funkcja do rejestrowania');
            setIsLoading(false);
            modalOpenHandler(
              modalState,
              dispatch,
              actionCreator,
              'info',
              response.message
            );
            history.push('/');
          } else {
            modalOpenHandler(
              modalState,
              dispatch,
              actionCreator,
              'info',
              response.message
            );
            history.push('/');
          }
        } catch (error) {
          console.log('ŁAPIĘ ERROR');

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
      if (props.formType === 'login') {
        console.log('Funkcja do logowania');

        try {
          setIsLoading(true);

          const user = await postAuth(
            '/auth/login', //http://localhost:8080
            values
          );

          if (user.success) {
            setIsLoading(false);

            // zapisywanie danych usera do reduxa
            const tokenExpDate = new Date(
              new Date().getTime() + 1000 * 60 * 60
            );
            dispatch(
              actionCreator.storeUserData({
                user: user.user,
                token: user.token,
                tokenExpDate: tokenExpDate.toISOString(),
              })
            );
            // zapisywanie  id Usera i TOKENA do localStorage

            localStorage.setItem(
              'userData',
              JSON.stringify({
                userId: user.user.id,
                token: user.token,
                expiration: tokenExpDate.toISOString(),
              })
            );
            modalOpenHandler(
              modalState,
              dispatch,
              actionCreator,
              'info',
              user.message
            );
            history.push('/');
          } else {
            setIsLoading(false);
            modalOpenHandler(
              modalState,
              dispatch,
              actionCreator,
              'info',
              user.message
            );
          }
        } catch (error) {
          modalOpenHandler(
            modalState,
            dispatch,
            actionCreator,
            'info',
            error.message
          );
        }
      }

      // alert(JSON.stringify(values, null, 2));
      // dispatch(actionTypes.storeUserData(user.user));
      // history.push('/');
    },
  });

  useEffect(() => {
    console.log('Use EFFECT');
    // console.log(formik.values);
    // console.log(imageFilePicker);
  }, [props.formType]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <StyledForm onSubmit={formik.handleSubmit}>
        {props.formType === 'register' && (
          <>
            <label htmlFor="userName">User Name</label>
            <StyledInput
              id={'userName'}
              name={'userName'}
              type={'text'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              danger={Object.keys(formik.errors).includes('userName')}
            />
            {formik.touched.userName && formik.errors.userName && (
              <StyledErrorDiv>{formik.errors.userName}</StyledErrorDiv>
            )}
          </>
        )}

        <label htmlFor="userName">E-Mail</label>
        <StyledInput
          id={'email'}
          name={'email'}
          type={'email'}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          danger={Object.keys(formik.errors).includes('userName')}
        />
        {formik.touched.email && formik.errors.email && (
          <StyledErrorDiv>{formik.errors.email}</StyledErrorDiv>
        )}

        <label htmlFor="password">Password</label>
        <StyledInput
          id={'password'}
          name={'password'}
          type={'password'}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          danger={Object.keys(formik.errors).includes('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <StyledErrorDiv>{formik.errors.password}</StyledErrorDiv>
        )}

        {props.formType === 'register' && (
          <>
            {' '}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <StyledInput
              id={'confirmPassword'}
              name={'confirmPassword'}
              type={'password'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              danger={Object.keys(formik.errors).includes('confirmPassword')}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <StyledErrorDiv>{formik.errors.confirmPassword}</StyledErrorDiv>
              )}
            <label htmlFor={'image'}>Profile Image</label>
            <ImageUploader
              id={'image'}
              name={'image'}
              fileState={imageFilePicker}
              fileStateHandler={setImageFilePicker}
            />
          </>
        )}

        <CustomButton type={'submit'}>
          {props.formType === 'login' ? 'Sign Up' : 'Register'}
        </CustomButton>

        {props.formType === 'login' ? (
          <CustomButton
            onClick={(e) => props.changeFormTypeFunc(e, 'loginBtn')}
          >
            Switch to Register
          </CustomButton>
        ) : (
          <CustomButton
            onClick={(e) => props.changeFormTypeFunc(e, 'registerBtn')}
          >
            Switch to Sign up
          </CustomButton>
        )}
      </StyledForm>
    </>
  );
};

export default AuthForm;
