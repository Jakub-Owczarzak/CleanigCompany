import './App.css';
import React, { useEffect, useState } from 'react';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Users from './user/pages/UsersPage/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import MainView from './shared/components/MainView/MainView';
import UserPlaces from './places/pages/UserPlaces';
import Modal from './shared/components/UIComponent/Modal';
import UpdatePlace from './places/pages/UpdatePlace';
import PlaceForm from './places/pages/PlaceForm';
import AuthFormView from './shared/components/MainView/AuthFormView';
import Landing from './shared/components/Landing/Landing';
import { modalOpenHandler } from './shared/Functions/modalFunction';
import * as actionCreator from './redux/actions';
let logoutTimer;

function App() {
  const { isAuthenicate, user, token, tokenExpDate } = useSelector(
    (state) => state.authReducer
  );

  const modalState = useSelector((state) => state.modalReducer.isOpen);

  const dispatch = useDispatch();
  const history = useHistory();

  const logOuthandler = () => {
    console.log('logout!!!!!!!!');
    dispatch(actionCreator.logout());
    localStorage.removeItem('userData'); // usuwanie rekordu z local storage
    modalOpenHandler(
      modalState,
      dispatch,
      actionCreator,
      'info',
      'Użytkownik wylogowany'
    );
  };

  const logUserWithToken = async (storedData) => {
    // aby nie zwracać nowego tokenu z nowym czasem itd
    //używamy danych tokena z localStorage
    const data = {
      expTime: storedData.expiration,
    };
    try {
      const logWithToken = await fetch(
        '/auth/loginToken', //  'http://localhost:8080/auth/loginToken'
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${storedData.token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const response = await logWithToken.json();
      if (response.success === false) {
        logOuthandler();
        return;
      }
      // aby nie zwracać nowego tokenu z nowym czasem itd
      //używamy danych tokena z localStorage
      // w innym wypadku gdybyśmy zwracali nowy token
      // czas 60 minut byłby odnawiany za każdym razem
      dispatch(
        actionCreator.tokenLogin({
          user: response.user,
          token: storedData.token,
          tokenExpDate: storedData.expiration,
        })
      );
    } catch (err) {
      console.log('BŁAD Z CATCH');
      modalOpenHandler(
        modalState,
        dispatch,
        actionCreator,
        'info',
        err.message
      );
    }
  };

  const storedData = JSON.parse(localStorage.getItem('userData'));

  // use effect do odliczania 60 minut od zalogowania do automatycznego wylogowania
  useEffect(() => {
    if (token) {
      const remainingTime =
        new Date(tokenExpDate).getTime() - new Date().getTime();
      console.log(remainingTime);
      logoutTimer = setTimeout(logOuthandler, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token]);

  // drugi use effect do automatycznego logowania
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    // sprawdzamy czy jest coś w locaStorage
    // czy jest tam token
    // i czy czas wygaśniecia który został zapisany przy logowaniu przez formularz
    // jest dalej większy od obecnego czasu
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      // jeśli tak to wywołujemy funckję automatycznego logowania
      logUserWithToken(storedData);
    }
  }, []);

  let routes;
  if (!isAuthenicate) {
    routes = (
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path={'/auth'} component={AuthFormView} />
        <Redirect to={'/auth'} />
      </Switch>
    );
  } else if (isAuthenicate && token) {
    routes = (
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/allUsers" exact component={Users} />
        <Route path="/:userId/places" component={UserPlaces} />
        <Route path="/places/:placeId" component={UpdatePlace} />
        <Route path={'/userPlace/new'} component={PlaceForm} />
        <Route path={'/auth'} component={AuthFormView} />
        <Redirect to={'/'} />
      </Switch>
    );
  } else if (isAuthenicate && token && user.userType === 'admin') {
    routes = (
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/allUsers" exact component={Users} />
        <Route path="/:userId/places" component={UserPlaces} />
        <Route path="/places/:placeId" component={UpdatePlace} />
        <Route path={'/userPlace/new'} component={PlaceForm} />
        <Route path={'/auth'} component={AuthFormView} />
        <Redirect to={'/'} />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <MainNavigation />
      <MainView>
        <Modal />
        {routes}
      </MainView>
    </BrowserRouter>
  );
}

export default App;
